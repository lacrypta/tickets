import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../../../lib/private/email";
import { getOrder, updateOrder } from "../../../../lib/private/firestore";
import {
  CreateCryptoPaymentRequestSchema,
  ICreateCryptoPaymentRequestBody,
} from "../../../../types/request";

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  // Requires POST
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
    return;
  }

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

  // Validate existance
  if (!order) {
    res.status(500).json({ false: true, message: "Order ID doesnt exist" });
    return;
  }

  if (order.status === "pending") {
    // **************** SEND Email **************** //
    sendEmail({
      fullname: order.fullname,
      email: order.email,
      url: "https://entradas.lacrypta.com.ar/entrada/" + orderId,
    });

    // Updates order
    updateOrder(orderId, {
      address,
      amount,
      tx,
      status: "completed",
    });
  }

  res.status(200).json({
    success: true,
  });
  return;
};

export default request;
