import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
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

function extractOrderId(payment: any) {
  return payment.additional_info.items[0].id;
}

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup MercadoPago
  mercadopago.configure(config);

  // Parse query
  let payment, paymentId: number;
  try {
    paymentId = z
      .number()
      .parse(parseInt(z.string().parse(req.query.payment_id)));
    payment = (await mercadopago.payment.get(paymentId)).body;
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Validation error" });
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
  let code;
  if (order.status !== "completed") {
    code = await addCode(orderId);
    await updateOrder(orderId, {
      status: "completed",
      pos: "print_pending",
      paymentMethod: "mercadopago",
      payment_id: paymentId,
    });
  }
  res.redirect(307, "/order/" + code);
};

export default request;
