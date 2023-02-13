// Types

import * as functions from "firebase-functions";
import { IPurchase } from "../../../types/purchase";
import { addUserToNotion, updateNotionEntry } from "../lib/notion";

const CLOUD_FUNCTIONS_REGION =
  process.env.CLOUD_FUNCTIONS_REGION || "southamerica-east1";

export const onPurchaseCreate = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .firestore.document("/purchases/{purchaseId}")
  .onCreate(async (snapshot, context) => {
    const purchase: IPurchase = snapshot.data() as IPurchase;

    const purchaseId = context.params.purchaseId;

    try {
      // Request for LNURL to lnbits
      purchase.id = purchaseId;
      const { id: notionId } = await addUserToNotion(purchase);

      const updated = await updateNotionEntry(notionId, {
        lnurl: "LNURL234242334",
      });

      console.info("updated:");
      console.dir(updated);
      // update purchase notionId
      await snapshot.ref.update({
        notion_id: notionId,
      });
    } catch (e: any) {
      functions.logger.error(`Error creating database on Notion`, e);
      return;
    }
  });
