// Types
import { IPayment, IPaymentFirestore } from "./../../../types/payment";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as mercadopago from "mercadopago";
import { ConfigTokenOption } from "mercadopago/configuration";

const HOSTNAME = process.env.HOSTNAME || "http://localhost:3000";
const TICKET_PRICE = process.env.TICKET_PRICE || "2000";
const MP_NOTIFICATION_URL = process.env.HOSTNAME || "http://localhost:3000";
const MP_ORDER_NAME = process.env.MP_ORDER_NAME || "La Crypta - Order";

const config: ConfigTokenOption = {
  access_token: process.env.MP_SECRET_TOKEN || "",
};

// Setup MercadoPago
mercadopago.configure(config);
console.dir(config);

export const onMercadopagoPayment = functions
  .region("southamerica-east1")
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
      functions.logger.debug(preference);
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
  .region("southamerica-east1")
  .https.onRequest(async (req, res) => {
    functions.logger.info("Request:");
    functions.logger.debug({
      req: {
        headers: req.headers,
        ip: req.ip,
        body: req.body,
        method: req.method,
        query: req.query,
      },
    });
    res.status(200).send({
      req: {
        headers: req.headers,
        ip: req.ip,
      },
    });
  });

async function getPreference(payment: IPayment): Promise<any> {
  return (
    await mercadopago.preferences.create({
      items: [
        {
          title: MP_ORDER_NAME,
          quantity: 1,
          currency_id: "ARS",
          unit_price: parseInt(TICKET_PRICE),
          id: payment.orderId,
        },
      ],
      back_urls: {
        success:
          HOSTNAME +
          "/api/gateway/mercadopago/approve?payment_id=" +
          payment.id,
      },
      additional_info: String(payment.id),
      statement_descriptor: MP_ORDER_NAME,
      auto_return: "all",
      notification_url: MP_NOTIFICATION_URL,
    })
  ).body;
}
