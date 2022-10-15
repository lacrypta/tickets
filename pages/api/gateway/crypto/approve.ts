import type { NextApiRequest, NextApiResponse } from "next";
import { parseUnits } from "ethers/lib/utils";

import {
  addTx,
  getOrder,
  isTxStored,
  updateOrder,
} from "../../../../lib/private/firestore";
import { getTransferEvent } from "../../../../lib/private/blockchain";
import {
  CreateCryptoPaymentRequestSchema,
  ICreateCryptoPaymentRequestBody,
} from "../../../../types/request";
import { sendEmail } from "../../../../lib/private/email";

const PERONIO_ADDRESS = process.env.NEXT_PUBLIC_PERONIO_ADDRESS || "";
const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS || "";
const TICKET_PRICE = process.env.NEXT_PUBLIC_TICKET_PRICE_PE || "";

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

  let txEvent;
  try {
    // Check if tx already claimed
    if (await isTxStored(tx)) {
      throw new Error("Transaction already claimed");
    }

    txEvent = await getTransferEvent(tx);

    // Event Validation
    if (txEvent.raw.transactionHash !== tx) {
      throw new Error("Invalid transaction hash");
    }
    if (txEvent.raw.address !== PERONIO_ADDRESS) {
      throw new Error("Invalid contract address");
    }
    if (txEvent.decoded.from !== address) {
      throw new Error("Invalid From");
    }
    if (txEvent.decoded.to !== BAR_ADDRESS) {
      throw new Error("Invalid to");
    }
    if (!txEvent.decoded.value.eq(parseUnits(TICKET_PRICE, 6))) {
      throw new Error("Invalid amount");
    }
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
      peAddress: PERONIO_ADDRESS,
      currentAddress: txEvent?.raw.address,
    });
    return;
  }

  // Add transaction to the storage
  addTx({
    contractAddress: PERONIO_ADDRESS,
    from: address,
    hash: tx,
    orderId,
    to: BAR_ADDRESS,
    value: parseFloat(amount),
  });

  // Get order
  const order = await getOrder(orderId);

  // Validate existance
  if (!order) {
    res.status(500).json({ success: false, message: "Order ID doesnt exist" });
    return;
  }

  if (order.status === "pending") {
    // Sends Email
    await sendEmail({
      fullname: order.fullname,
      email: order.email,
      url: "https://entradas.lacrypta.com.ar/entrada/" + orderId,
    });
    // Updates order
    await updateOrder(orderId, {
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
