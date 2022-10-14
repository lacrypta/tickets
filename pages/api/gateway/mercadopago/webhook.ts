import type { NextApiRequest, NextApiResponse } from "next";
import { log } from "next-axiom";
import { getOrder, updateOrder } from "./../../../../lib/private/firestore";

import mercadopago from "mercadopago";
import { sendEmail } from "../../../../lib/private/email";
import { ConfigTokenOption } from "mercadopago/configuration";

const config: ConfigTokenOption = {
  access_token: process.env.MP_SECRET_TOKEN || "",
};

function extractOrderId(payment: any) {
  return payment.additional_info.items[0].id;
}

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  log.debug("req.body", req.body);
  log.debug("req.query", req.query);
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

  log.debug("paymentId", paymentId);
  console.info("Payment ID:", paymentId);

  try {
    payment = (await mercadopago.payment.get(paymentId)).body;
  } catch (e) {
    log.debug("Payment not found", {
      paymentId,
      payment,
    });
    res.status(500).json({ success: false, message: "Payment not found" });
    return;
  }

  log.debug("payment", payment);
  // Not yet approved
  if (payment.status !== "approved") {
    res.status(500).json({ success: false, message: "Not yet approved" });
    return;
  }

  // Gets Order
  const orderId = extractOrderId(payment);
  const order = await getOrder(orderId);

  log.debug("order", order);
  if (!order) {
    res.status(500).json({ success: false, message: "Order ID doesnt exist" });
    return;
  }

  // If still pending
  if (order.status !== "completed") {
    // **************** SEND Email **************** //
    const mail = await sendEmail({
      fullname: order.fullname,
      email: order.email,
      url: "https://entradas.lacrypta.com.ar/entrada/" + orderId,
    });
    log.debug("mail", mail);
    await updateOrder(orderId, {
      status: "completed",
      payment_method: "mercadopago",
      payment_id: paymentId,
    });
  }
  res.status(200).json({ success: true, message: "Order ID doesnt exist" });
};

export default request;
