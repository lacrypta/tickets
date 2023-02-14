import { db } from "../../lib/private/firebase";
import fixture from "../../data/fixture";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../types/request";

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
    orders.forEach((order) => {
      const orderRef = db.collection("orders").doc(order.id);
      orderRef.set(order);
    });

    // Add payments to database
    payments.forEach((payment) => {
      const paymentRef = db.collection("payments").doc(payment.id);
      paymentRef.set(payment);
    });

    // Add purchases to database
    purchases.forEach((purchase) => {
      const purchaseRef = db.collection("purchases").doc(purchase.id);
      purchaseRef.set(purchase);
    });

    res.status(200).json({ success: true, data: { fixture } });
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message });
  }
}
