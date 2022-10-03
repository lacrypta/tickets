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

  const { address, items }: ICreateOrderRequestBody = req.body;

  const orderId = await addOrder(address, items);

  res.status(200).json({
    success: true,
    data: {
      id: orderId,
    },
  });
};

export default request;
