// Types
import { IPayment, IPaymentFirestore } from "./../../../types/payment";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as mercadopago from "mercadopago";
import { ConfigTokenOption } from "mercadopago/configuration";
import { setPaymentAsPaid } from "../lib/payment";

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
console.dir(config);

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

    let preference: any;

    try {
      preference = await getPreference(payment);
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
    });
  });

export const onMercadoPagoWebhook = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .https.onRequest(async (req, res) => {
    functions.logger.info("Request:");

    const debugData = {
      req: {
        headers: req.headers,
        ip: req.ip,
        body: req.body,
        method: req.method,
        query: req.query,
      },
    };

    functions.logger.debug("Request", debugData);

    if (req.query.type !== "payment") {
      res.status(200).send({
        content: "Method not implemented yet",
      });
      return;
    }
    admin.firestore().collection("debug").add(debugData);

    try {
      const {
        action,
        data: { id: mpPaymentId },
      } = req.body;

      if (action !== "payment.created" || !mpPaymentId) {
        throw new Error("Invalid action or payment ID");
      }

      const { paymentId, amount } = await getPayment(mpPaymentId);

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

async function getPreference(payment: IPayment): Promise<any> {
  const hash = payment.id + (process.env.HASH_SALT || "");
  const webhookUrl =
    FUNCTIONS_URL +
    "onMercadoPagoWebhook?payment_id=" +
    payment.id +
    "&code=" +
    hash;

  functions.logger.info(`Webhook URL: ${webhookUrl}`);
  return (
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
        success: HOSTNAME + "/pago/mercadopago",
      },
      additional_info: String(payment.id),
      statement_descriptor: MP_ORDER_NAME,
      auto_return: "all",
      notification_url: webhookUrl,
    })
  ).body;
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
