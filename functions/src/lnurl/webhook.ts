import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const CLOUD_FUNCTIONS_REGION =
  process.env.CLOUD_FUNCTIONS_REGION || "southamerica-east1";

export const onLNURLwWebhook = functions
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

    console.info("debugData:");
    console.dir(debugData);
    const { purchaseId } = req.query;

    // update order status
    functions.logger.info(`Getting purchase from firebase (${purchaseId}):`);
    await admin
      .firestore()
      .collection("purchases")
      .doc(purchaseId as string)
      .update({
        status: "withdrawn",
      });
  });
