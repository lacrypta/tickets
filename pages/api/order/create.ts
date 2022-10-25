import type { NextApiRequest, NextApiResponse } from "next";
import { addOrder } from "../../../lib/private/firestore";
import { getTotal } from "../../../lib/public/menu";

import {
  ICreateOrderRequestBody,
  OrderSchema,
  ResponseDataType,
} from "../../../types/request";

const PERONIO_MULTIPLIER = parseFloat(process.env.PERONIO_MULTIPLIER || "1");

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

  const { address, items, paymentMethod }: ICreateOrderRequestBody = req.body;
  let total = await getTotal(items);

  total = paymentMethod === "peronio" ? total * PERONIO_MULTIPLIER : total;

  const orderId = await addOrder(items, paymentMethod, total, address);

  res.status(200).json({
    success: true,
    data: {
      id: orderId,
      total,
    },
  });
};

export default request;
