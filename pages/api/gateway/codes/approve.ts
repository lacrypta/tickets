import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../../../lib/private/email";
import {
  claimCode,
  getOrder,
  updateOrder,
} from "../../../../lib/private/firestore";
import {
  ClaimCodeRequestSchema,
  ResponseDataType,
} from "../../../../types/request";

const request = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) => {
  // Validate
  try {
    ClaimCodeRequestSchema.parse(req.body);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Malformed request",
    });
    return;
  }

  // Parse body
  const { orderId, code } = req.body;

  // Get order
  const order = await getOrder(orderId);

  // Validate existance
  if (!order) {
    res.status(500).json({ success: false, message: "Order ID doesnt exist" });
    return;
  }

  // Claim if available
  if (!(await claimCode(code))) {
    // Invalid claim
    res.status(401).json({
      success: false,
      message: "Not available",
    });
    return;
  }

  // TODO: Repeated code. Should be in a library
  if (order.status === "pending") {
    // **************** SEND Email **************** //
    await sendEmail({
      fullname: order.fullname,
      email: order.email,
      url: "https://entradas.lacrypta.com.ar/entrada/" + orderId,
    });

    // Updates order
    await updateOrder(orderId, {
      code,
      payment_method: "invitation",
      status: "completed",
    });
  }

  // Result
  res.status(200).json({
    success: true,
    data: {
      message: "yeahh",
    },
  });
};

export default request;
