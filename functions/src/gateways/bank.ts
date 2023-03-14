import * as functions from "firebase-functions";
import { setPaymentAsPaid } from "../lib/payment";

const CLOUD_FUNCTIONS_REGION =
  process.env.CLOUD_FUNCTIONS_REGION || "southamerica-east1";

export const onBankPayment = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .firestore.document("/payments/{paymentId}")
  .onUpdate(async (snapshot, context) => {
    const { after } = snapshot;
    const payment = after.data();
    console.info("Executing onBankPayment");
    if (payment.method !== "bank" || payment.status !== "executing") {
      return;
    }

    payment.id = context.params.paymentId;

    functions.logger.info(`Payment (${payment.id}) being updated:`);

    await setPaymentAsPaid({
      paymentId: payment.id,
      amount: payment.amount,
      method: "bank",
    });
  });
