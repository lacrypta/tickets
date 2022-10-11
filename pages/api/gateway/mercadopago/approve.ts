import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getOrder, updateOrder } from "./../../../../lib/private/firestore";

import mercadopago from "mercadopago";
import { sendEmail } from "../../../../lib/private/email";

function extractOrderId(payment: any) {
  return payment.additional_info.items[0].id;
}

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const paymentId = z
      .number()
      .parse(parseInt(z.string().parse(req.query.payment_id)));
    const payment = (await mercadopago.payment.get(paymentId)).body;

    // Not yet approved
    if (payment.status !== "approved") {
      res.status(500).json({ success: true, message: "Not yet approved" });
      return;
    }

    // Gets Order
    const orderId = extractOrderId(payment);
    const order = await getOrder(orderId);

    if (!order) {
      res.status(500).json({ false: true, message: "Order ID doesnt exist" });
      return;
    }

    // If still pending
    if (order.status === "pending") {
      updateOrder(orderId, {
        status: "completed",
        payment_id: paymentId,
      });

      // **************** SEND Email **************** //
      await sendEmail({
        fullname: order.fullname,
        email: order.email,
        url: "https://eventos.lacrypta.com.ar/entrada/" + orderId,
      });
    }
    res.redirect(307, "/entrada/" + orderId);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Validation error" });
  }
};

export default request;
