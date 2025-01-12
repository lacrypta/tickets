import { IPayment } from "./../../../types/payment";
import { IPurchase } from "./../../../types/purchase";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { IOrder } from "../../../types/order";
import { sendEmail } from "./email";

const HOSTNAME = process.env.HOSTNAME || "http://localhost:3000";

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
    throw new Error(`Invalid payment method (${method})`);
  }
  if (!["waiting", "executing"].includes(payment?.status)) {
    throw new Error("Invalid payment status");
  }
  if (payment?.amount !== amount) {
    console.info("Payment amount:", payment?.amount);
    console.info("amount:", amount);
    throw new Error("Invalid amount");
  }

  // Get order from Firestore
  const orderRef = admin.firestore().collection("orders").doc(payment.orderId);
  const order = (await orderRef.get()).data();

  functions.logger.debug(`Order stored`, order);

  // Validate order
  if (!order || !["pending", "processing"].includes(order.status)) {
    throw new Error(
      "Order must be pending or processing, must be " + order?.status
    );
  }

  // Create from Purchase element
  const purchaseRef = admin.firestore().collection("purchases").doc();
  const purchase: IPurchase = {
    id: purchaseRef.id,
    user: order.user,
    payment: { id: paymentId, ...(payment as IPayment), status: "paid" },
    order: { id: payment.orderId, ...(order as IOrder), status: "completed" },
    status: "ready",
  };

  // Update order and payment
  admin.firestore().runTransaction(async (t) => {
    t.create(purchaseRef, purchase);
    t.update(paymentRef, { status: "paid" });
    t.update(orderRef, { status: "completed", purchaseId: purchaseRef.id });
  });

  functions.logger.info(`Sending Mail to (${order.user.email})`);
  sendEmail({
    email: order.user.email,
    fullname: order.user.fullname,
    url: HOSTNAME + "/entrada/" + purchaseRef.id,
  }).then(() => {
    functions.logger.info(`E-mail sent to (${order.user.email})`);
  });

  functions.logger.info(`Payment (${paymentId}) updated:`);
  functions.logger.info(`Order (${paymentId}) updated:`);
};
