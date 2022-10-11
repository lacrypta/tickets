import type { NextApiRequest, NextApiResponse } from "next";
import { addOrder } from "../../../lib/private/firestore";

import {
  ICreateOrderRequestBody,
  OrderSchema,
  ResponseDataType,
} from "../../../types/request";

const request = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) => {
  // TODO: Limit user order creation by time
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
    return;
  }

  try {
    OrderSchema.parse(req.body);
  } catch (e) {
    res.status(400).json({ success: false, message: "Malformed request" });
  }

  const {
    email,
    fullname,
    paymentMethod: payment_method,
    address,
  }: ICreateOrderRequestBody = req.body;

  const orderId = await addOrder({
    email,
    fullname,
    address,
    payment_method,
    status: "pending",
  });

  res.status(200).json({
    success: true,
    data: {
      id: orderId,
    },
  });
};

export default request;
