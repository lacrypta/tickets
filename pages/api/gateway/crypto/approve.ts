import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../../../lib/private/email";
import { getOrder, updateOrder } from "../../../../lib/private/firestore";
import {
  CreateCryptoPaymentRequestSchema,
  ICreateCryptoPaymentRequestBody,
} from "../../../../types/request";

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  // Requires POST

  console.info("Pre post");
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
    return;
  }

  console.info("Validate");
  console.dir(req.body);
  // Validate body type
  try {
    CreateCryptoPaymentRequestSchema.parse(req.body);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Validation error" });
    return;
  }

  // Parse request
  const { address, amount, orderId, tx }: ICreateCryptoPaymentRequestBody =
    req.body;

  // Get order
  const order = await getOrder(orderId);

  console.info("Get Order:");
  console.dir(order);

  // Validate existance
  if (!order) {
    res.status(500).json({ success: true, message: "Order ID doesnt exist" });
    return;
  }

  if (order.status === "pending") {
    // **************** SEND Email **************** //
    sendEmail({
      fullname: order.fullname,
      email: order.email,
      url: "https://entradas.lacrypta.com.ar/entrada/" + orderId,
    });

    console.info("Email sent");

    // Updates order
    updateOrder(orderId, {
      address,
      amount,
      tx,
      payment_method: "crypto",
      status: "completed",
    });
  }

  res.status(200).json({
    success: true,
  });
  return;
};

export default request;
