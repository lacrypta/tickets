import { IPreference } from "./../../../types/preference";
// Types
import { IPayment, IPaymentFirestore } from "./../../../types/payment";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as mercadopago from "mercadopago";

import { ConfigTokenOption } from "mercadopago/configuration";
import { setPaymentAsPaid } from "../lib/payment";
import { addSeconds } from "../lib/database";

const TICKET_PRICE = process.env.TICKET_PRICE || "2000";
const HOSTNAME = process.env.HOSTNAME || "http://localhost:3000";
const MP_ORDER_NAME = process.env.MP_ORDER_NAME || "La Crypta - Order";
const CLOUD_FUNCTIONS_REGION =
  process.env.CLOUD_FUNCTIONS_REGION || "southamerica-east1";

const FUNCTIONS_URL = `https://${CLOUD_FUNCTIONS_REGION}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/`;

const config: ConfigTokenOption = {
  access_token: process.env.MP_SECRET_TOKEN || "",
};

// Setup MercadoPago
mercadopago.configure(config);

export const onMercadoPagoPayment = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .firestore.document("/payments/{paymentId}")
  .onCreate(async (snapshot, context) => {
    const payment: IPayment = snapshot.data() as IPaymentFirestore;
    if (payment.method !== "mercadopago") {
      return;
    }
    payment.id = context.params.paymentId;

    functions.logger.info(`Payment (${payment.id}) being updated:`);

    let preference: IPreference;

    try {
      functions.logger.info("START:MercadoPago getPreference");
      preference = await getPreference(payment);
      functions.logger.info("FINISH:MercadoPago getPreference");
      functions.logger.debug("preference", preference);
    } catch (e: any) {
      functions.logger.error(`Error getting preference ID from MercadoPago`, e);
      return snapshot.ref.update({
        status: "cancelled",
        error: e.message,
      });
    }

    // update order status
    functions.logger.info(`Update order (${payment.orderId}):`);
    await admin
      .firestore()
      .collection("orders")
      .doc(payment.orderId as string)
      .update({
        status: "processing",
      });

    return snapshot.ref.update({
      preference_id: preference.id,
      link: preference.link,
    });
  });

export const onMercadoPagoWebhook = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .https.onRequest(async (req, res) => {
    const debugData = {
      req: {
        headers: req.headers,
        ip: req.ip,
        body: req.body,
        method: req.method,
        query: req.query,
      },
    };

    functions.logger.debug("Request debug", debugData);

    if (req.query.type !== "payment") {
      res.status(200).send({
        content: "Method not implemented yet",
      });
      return;
    }

    try {
      const {
        action,
        data: { id: mpPaymentId },
      } = req.body;

      if (action !== "payment.created" || !mpPaymentId) {
        throw new Error("Invalid action or payment ID");
      }

      functions.logger.info("Start:MercadoPago getPayment");
      const { paymentId, amount } = await getPayment(mpPaymentId);
      functions.logger.info("FINISH:MercadoPago getPayment");
      await setPaymentAsPaid({ paymentId, amount, method: "mercadopago" });

      res.status(200).send({
        req: {
          headers: req.headers,
          ip: req.ip,
        },
      });
    } catch (e: any) {
      functions.logger.error("Error getting payment", e);
      res.status(500).send({
        error: e.message,
      });
    }
  });

async function getPreference(payment: IPayment): Promise<IPreference> {
  const preferencesRef = admin.firestore().collection("preferences");

  const query = preferencesRef
    .where("updated", "<", addSeconds(new Date(), -300)) // Used less than 5 minutes ago
    .where("type", "==", "link") // Has link
    .orderBy("updated", "asc")
    .limit(1);

  let preferenceData;

  // START transaction
  await admin.firestore().runTransaction(async (t) => {
    const snapshot = await t.get(query);
    console.info("---- snapshot: ");
    console.dir(snapshot);

    if (!snapshot.empty) {
      const preferenceRef = snapshot.docs[0].ref;
      preferenceData = snapshot.docs[0].data() as IPreference;
      const paymentRef = admin
        .firestore()
        .collection("payments")
        .doc(payment.id as string);
      // Update Preference
      preferenceRef.update({
        paymentId: payment.id,
        updated: new Date(),
      });

      // Update Payment
      paymentRef.update({
        link: preferenceData.link,
      });
      return;
    }
  });
  // END transaction

  if (preferenceData) {
    return preferenceData;
  }
  return createPreference(payment);
}

async function createPreference(payment: IPayment): Promise<IPreference> {
  const webhookUrl =
    FUNCTIONS_URL + "onMercadoPagoWebhook?payment_id=" + payment.id;

  functions.logger.info("Webhook URL", webhookUrl);
  const preference = (
    await mercadopago.preferences.create({
      items: [
        {
          title: MP_ORDER_NAME,
          quantity: 1,
          currency_id: "ARS",
          unit_price: parseInt(TICKET_PRICE),
          id: payment.id,
        },
      ],
      back_urls: {
        success: HOSTNAME + "pago/mercadopago",
      },
      statement_descriptor: MP_ORDER_NAME,
      auto_return: "all",
      notification_url: webhookUrl,
    })
  ).body;

  console.info("preference:");
  console.dir(preference);
  const preferencesRef = admin
    .firestore()
    .collection("preferences")
    .doc(preference.id);

  const preferenceData: IPreference = {
    id: preference.id,
    type: "fallback",
    paymentId: payment.id as string,
    updated: new Date(),
  };
  preferencesRef.set(preferenceData);

  return preferenceData;
}

async function getPayment(
  mercadoPagoPaymentId: number
): Promise<{ payment: any; paymentId: string; amount: number }> {
  const payment = (await mercadopago.payment.get(mercadoPagoPaymentId)).body;
  const paymentId = payment.additional_info.items[0].id;
  const amount = payment.transaction_details.total_paid_amount;
  return {
    payment,
    paymentId,
    amount,
  };
}
