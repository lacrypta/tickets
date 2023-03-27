// Types

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { IPurchase } from "../../../types/purchase";
import { generateWithdrawLink } from "../lib/lnbits";

const CLOUD_FUNCTIONS_REGION =
  process.env.CLOUD_FUNCTIONS_REGION || "southamerica-east1";

const SAT_AMOUNT = parseInt(process.env.LIGHTNING_CLAIM_AMOUNT || "10000");
const FUNCTIONS_URL = `https://${CLOUD_FUNCTIONS_REGION}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net`;

export const onTicketScan = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .firestore.document("/purchases/{purchaseId}")
  .onUpdate(async (change, context) => {
    const currentPurchase: IPurchase = change.before.data() as IPurchase;
    const updatedPurchase: IPurchase = change.after.data() as IPurchase;
    if (
      currentPurchase.status !== "ready" ||
      currentPurchase.lnUrlw ||
      updatedPurchase.status !== "claimed"
    ) {
      return;
    }
    const purchaseId = context.params.purchaseId;

    try {
      // Request for LNURL to lnbits

      const webhookUrl = `${FUNCTIONS_URL}/onLNURLwWebhook?purchaseId=${purchaseId}`;
      const lnUrl = await generateWithdrawLink(SAT_AMOUNT, webhookUrl);

      // update purchase lnUrl
      await admin.firestore().collection("purchases").doc(purchaseId).update({
        lnUrlw: lnUrl,
      });
    } catch (e: any) {
      functions.logger.error(`Error generating LNURL from LNBITS`, e);
      return;
    }
  });
