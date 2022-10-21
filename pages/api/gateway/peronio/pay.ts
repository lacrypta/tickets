import type { NextApiRequest, NextApiResponse } from "next";

import {
  ERC20PaymentSchema,
  IERC20PaymentRequestBody,
} from "../../../../types/request";
import {
  decodePayload,
  encodeVoucher,
} from "../../../../plugins/gateway/lib/utils";

import { addERC20Payment } from "../../../../lib/private/firestore";
import { serveVoucher } from "../../../../lib/private/blockchain";

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

  let requestData: IERC20PaymentRequestBody;
  try {
    requestData = ERC20PaymentSchema.parse(req.body);
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: "Malformed request" });
    return;
  }

  const { voucher, signature } = requestData.voucher;
  const payload = decodePayload(voucher.payload);

  try {
    if (payload.to !== BAR_ADDRESS) {
      throw new Error("Invalid destination");
    }

    // Add
    const paymentId = await addERC20Payment(
      requestData.orderId,
      requestData.voucher,
      payload
    );

    // Broadcast
    console.info("Needs to broadcast");
    console.info("Payment ID: " + paymentId);
    try {
      const tx = await serveVoucher(encodeVoucher(voucher), signature);
      console.info("Broadcaster TX!:");
      console.dir(tx);
    } catch (e: any) {
      console.error(e);
      throw new Error("Transaction not broaadcasted");
    }
  } catch (e: any) {
    console.error(e);
    res.status(406).json({ success: false, message: e.message });
  }
};

export default request;
