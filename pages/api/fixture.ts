import { db } from "../../lib/private/firebase";
import fixture from "../../data/fixture";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../types/request";
import { IOrder } from "../../types/order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    if (!process.env.NEXT_PUBLIC_DEBUG) {
      throw new Error("Not in debug mode`");
    }

    const { orders, payments, purchases } = fixture;

    // Add orders to database
    orders.forEach(async (order) => {
      const orderRef = db.collection("orders").doc(order.id);
      await orderRef.set(order);
    });

    // Add payments to database
    payments.forEach(async (payment) => {
      const paymentRef = db.collection("payments").doc(payment.id);
      await paymentRef.set(payment);
    });

    // Add purchases to database
    // Added timeout for Notion
    setTimeout(() => {
      purchases.forEach(async (purchase) => {
        const orderRef = db.collection("orders").doc(purchase.order.id);
        const order = (await (await orderRef.get()).data()) as IOrder;
        const purchaseRef = db.collection("purchases").doc(purchase.id);
        await purchaseRef.set({
          ...purchase,
          order: { id: purchase.order.id, ...order },
        });
      });
    }, 3000);

    res.status(200).json({ success: true, data: { fixture } });
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message });
  }
}
