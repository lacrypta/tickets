import type { NextApiRequest, NextApiResponse } from "next";
import {
  addCode,
  getOrder,
  updateOrder,
} from "./../../../../lib/private/firestore";

import mercadopago from "mercadopago";
import { ConfigTokenOption } from "mercadopago/configuration";

const config: ConfigTokenOption = {
  access_token: process.env.MP_SECRET_TOKEN || "",
};
getOrder;
function extractOrderId(payment: any) {
  return payment.additional_info.items[0].id;
}

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info("req.body");
  console.dir(req.body);

  if (req.query.type !== "payment") {
    console.info("Not proper topic");
    res.status(200).json({ success: true, message: "Thanks!" });
    return;
  }

  console.info("Payment received!");

  // Setup MercadoPago
  mercadopago.configure(config);

  // Parse query
  let payment, paymentId: number;
  paymentId = parseInt(req.body.data.id);

  console.info("Payment ID:", paymentId);

  try {
    payment = (await mercadopago.payment.get(paymentId)).body;
  } catch (e) {
    res.status(500).json({ success: false, message: "Payment not found" });
    return;
  }

  // Not yet approved
  if (payment.status !== "approved") {
    res.status(500).json({ success: false, message: "Not yet approved" });
    return;
  }

  // Gets Order
  const orderId = extractOrderId(payment);
  const order = await getOrder(orderId);

  if (!order) {
    res.status(500).json({ success: false, message: "Order ID doesnt exist" });
    return;
  }

  // If still pending
  if (order.status !== "completed") {
    await addCode(orderId);
    await updateOrder(orderId, {
      status: "completed",
      payment_method: "mercadopago",
      payment_id: paymentId,
    });
  }
  res.status(200).json({ success: true, message: "Order ID doesnt exist" });
};

export default request;
