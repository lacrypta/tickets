import { NextApiRequest, NextApiResponse } from "next";
import { getOrder, getOrderIdByCode } from "../../../lib/private/firestore";
import { ResponseDataType } from "../../../types/request";

const request = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) => {
  try {
    const { code } = req.query;
    const orderId = await getOrderIdByCode(code as string);
    if (!orderId) {
      throw new Error("No order for that code");
    }
    const order = getOrder(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    res.status(200).json({
      success: true,
      data: {
        id: orderId,
        order,
      },
    });
  } catch (e: any) {
    console.error(e);
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export default request;
