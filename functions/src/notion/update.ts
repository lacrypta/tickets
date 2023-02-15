import * as functions from "firebase-functions";
import { IPurchase } from "../../../types/purchase";
import { setUserAsPaid, setUserLNURL, setUserStatus } from "../lib/notion";

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
      await setUserAsPaid(notionId, purchase);

      await snapshot.ref.update({
        notion_id: notionId,
      });
    } catch (e: any) {
      functions.logger.error(`Error update Notion entry`, e);
      return;
    }
  });

export const onPurchaseUpdate = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .firestore.document("/purchases/{purchaseId}")
  .onUpdate(async (change) => {
    const currentPurchase: IPurchase = change.before.data() as IPurchase;
    const updatedPurchase: IPurchase = change.after.data() as IPurchase;
    const notion_id = currentPurchase.notion_id;
    if (
      currentPurchase.status !== "claimed" &&
      updatedPurchase.status == "claimed"
    ) {
      setUserStatus(notion_id as string, "Check-in");
      return;
    }

    if (!currentPurchase.lnUrlw && updatedPurchase.lnUrlw) {
      setUserStatus(notion_id as string, "Check-in");
      await setUserLNURL(
        currentPurchase.notion_id as string,
        updatedPurchase.lnUrlw as string
      );
    }
  });
