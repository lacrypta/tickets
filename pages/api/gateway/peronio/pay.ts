import type { NextApiRequest, NextApiResponse } from "next";
import { addPayment } from "../../../../lib/private/firestore";
import { IPaymentRequestBody, PaymentSchema } from "../../../../types/request";

const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS;

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
    return;
  }

  try {
    PaymentSchema.parse(req.body);
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: "Malformed request" });
    return;
  }

  try {
    const payment: IPaymentRequestBody = req.body;
    if (payment.voucher.voucher.payload.to !== BAR_ADDRESS) {
      throw new Error("Invalid destination");
    }
    const paymentId = await addPayment(payment.orderId, payment.voucher);
    res.status(200).json({ success: true, data: { paymentId } });
  } catch (e: any) {
    console.error(e);
    res.status(406).json({ success: false, message: e.message });
  }
};

export default request;
