import * as functions from "firebase-functions";
import { IOrder } from "../../../types/order";
import { addUser } from "../lib/notion";

const CLOUD_FUNCTIONS_REGION =
  process.env.CLOUD_FUNCTIONS_REGION || "southamerica-east1";

export const onOrderCreate = functions
  .region(CLOUD_FUNCTIONS_REGION)
  .firestore.document("/orders/{orderId}")
  .onCreate(async (snapshot, context) => {
    const order: IOrder = snapshot.data() as IOrder;
    const orderId = context.params.orderId;

    try {
      const { id: notionId } = await addUser({
        id: orderId,
        ...order,
      });
      await snapshot.ref.update({
        notion_id: notionId,
      });

      console.info("******* ORDER UPDATED !!!");
    } catch (e: any) {
      functions.logger.error(`Error creating database on Notion`, e);
      return;
    }
  });
