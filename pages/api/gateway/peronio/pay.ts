import type { NextApiRequest, NextApiResponse } from "next";

import {
  ERC20PaymentSchema,
  IERC20PaymentRequestBody,
} from "../../../../types/request";
import {
  decodePayload,
  encodeVoucher,
} from "../../../../plugins/gateway/lib/utils";

import { addCode, addERC20Payment } from "../../../../lib/private/firestore";
import { serveVoucher } from "../../../../lib/private/blockchain";

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

  let txHash;
  try {
    const payload = decodePayload(voucher.payload);
    // Broadcast
    try {
      txHash = await serveVoucher(encodeVoucher(voucher), signature);
    } catch (e: any) {
      console.error(e);
      throw new Error("Transaction not broaadcasted");
    }

    // Add
    const paymentId = await addERC20Payment(
      requestData.orderId,
      requestData.voucher,
      payload
    );

    const code = await addCode(requestData.orderId);

    // Reply OK
    res.status(200).json({
      success: true,
      data: {
        paymentId,
        txHash,
        code,
      },
    });
  } catch (e: any) {
    console.error(e);
    res.status(406).json({ success: false, message: e.message });
  }
};

export default request;
