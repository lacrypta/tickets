import { IPaymentFirestore } from "./../../types/payment";
import * as functions from "firebase-functions";
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// export const onCreateOrder = functions
//   .region("southamerica-east1")
//   .firestore.document("/orders/{orderId}")
//   .onCreate((snapshot, context) => {
//     functions.logger.info("New orden id created:", context.params.orderId);
//     functions.logger.info("Context:");
//     functions.logger.debug(context);
//     functions.logger.info("Snapshot:");
//     functions.logger.debug(snapshot.data());

//     // Tests new data being added
//     // admin.firestore().collection("testo").add(snapshot.data());

//     return snapshot.ref.update({ test: "test" });
//   });

export const onCreatePayment = functions
  .region("southamerica-east1")
  .firestore.document("/payments/{paymentId}")
  .onCreate(async (snapshot, context) => {
    const { paymentId } = context.params;
    const payment = snapshot.data() as IPaymentFirestore;
    functions.logger.info(`Payment (${paymentId}) being updated:`);
    functions.logger.debug(payment);

    let preferenceId;
    switch (payment.method) {
      case "mercadopago":
        preferenceId = "1234567890"; // Simualted from MercadoPago

        // update order status
        functions.logger.info(`Update order (${payment.orderId}):`);
        await admin
          .firestore()
          .collection("orders")
          .doc(payment.orderId)
          .update({
            status: "processing",
          });

        return snapshot.ref.update({
          preference_id: preferenceId,
        });
    }

    return;
  });
