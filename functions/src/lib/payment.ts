import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const setPaymentAsPaid = async ({
  paymentId,
  amount,
  method,
}: {
  paymentId: string;
  amount: number;
  method: string;
}) => {
  // Get payment from Firestore
  const paymentRef = admin.firestore().collection("payments").doc(paymentId);
  const payment = (await paymentRef.get()).data();

  functions.logger.debug(`Function call`, { paymentId, amount, method });
  functions.logger.debug(`Payment stored`, payment);

  // Validate payment
  if (payment?.method !== method) {
    throw new Error("Invalid payment method");
  }
  if (payment?.status !== "waiting") {
    throw new Error("Invalid payment method");
  }
  if (payment?.amount !== amount) {
    throw new Error("Invalid amount");
  }

  // Get order from Firestore
  const orderRef = admin.firestore().collection("orders").doc(payment.orderId);
  const order = (await orderRef.get()).data();

  functions.logger.debug(`Order stored`, order);

  // Validate order
  if (!["pending", "processing"].includes(order?.status)) {
    throw new Error(
      "Order must be pending or processing, must be " + order?.status
    );
  }

  // Update order and payment
  admin.firestore().runTransaction(async (t) => {
    t.update(paymentRef, { status: "paid" });
    t.update(orderRef, { status: "completed" });
  });

  functions.logger.info(`Payment (${paymentId}) updated:`);
  functions.logger.info(`Order (${paymentId}) updated:`);
};
