import * as functions from "firebase-functions";
import { IPurchase } from "../../../types/purchase";
import { updateNotionStatus } from "../lib/notion";

const CLOUD_FUNCTIONS_REGION =
  process.env.CLOUD_FUNCTIONS_REGION || "southamerica-east1";

export const onPurchaseCreate = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .firestore.document("/purchases/{purchaseId}")
  .onCreate(async (snapshot) => {
    const purchase: IPurchase = snapshot.data() as IPurchase;
    const notionId = purchase.order?.notion_id as string;

    console.info("--- purchase: ");
    console.dir(purchase);
    try {
      await updateNotionStatus(notionId, "ready", {
        preference_id: purchase.payment?.preference_id,
      });

      await snapshot.ref.update({
        notion_id: notionId,
      });
    } catch (e: any) {
      functions.logger.error(`Error update Notion entry`, e);
      return;
    }
  });

// // export const onTicketScan = functions
// //   .region(CLOUD_FUNCTIONS_REGION)
// //   .firestore.document("/purchases/{purchaseId}")
// //   .onUpdate(async (change, context) => {
// //     const currentPurchase: IPurchase = change.before.data() as IPurchase;
// //     const updatedPurchase: IPurchase = change.after.data() as IPurchase;
// //     if (
// //       currentPurchase.status !== "ready" ||
// //       currentPurchase.lnUrlw ||
// //       updatedPurchase.status !== "claimed"
// //     ) {
// //       return;
// //     }
// //     const purchaseId = context.params.purchaseId;

// //     // const updated = await updateNotionEntry(notionId, {
// //       //   lnurl: "LNURL234242334",
// //       // });

// //       // console.info("updated:");
// //       // console.dir(updated);
// //       // update purchase notionId

// //   });
