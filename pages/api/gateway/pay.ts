import type { NextApiRequest, NextApiResponse } from "next";
import { addPayment } from "../../../lib/private/firestore";
import { IPaymentRequestBody, PaymentSchema } from "../../../types/request";

type Data = {
  success: boolean;
  message?: string;
  data?: any;
};

const request = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
  }

  try {
    PaymentSchema.parse(req.body);
  } catch (e) {
    res.status(400).json({ success: false, message: "Malformed request" });
  }

  const payment: IPaymentRequestBody = req.body;
  const paymentId = await addPayment(payment.order, payment.voucher);

  res.status(200).json({ success: true, data: { paymentId } });
};

export default request;
