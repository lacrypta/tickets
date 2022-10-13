import type { NextApiRequest, NextApiResponse } from "next";
import { log } from "../../../../lib/private/firestore";
import { ITokenTransferEvent } from "../../../../types/crypto";
// import { getOrder, updateOrder } from "./../../../../lib/private/firestore";

// import { sendEmail } from "../../../../lib/private/email";

const parseRequest = (data: any): ITokenTransferEvent => {
  if (data.type !== "ADDRESS_ACTIVITY") {
    throw new Error("Invalid request");
  }

  const activity = data.event.activity[0];

  if (activity !== "MATIC_MAINNET") {
    throw new Error("Invalid network");
  }

  return {
    contractAddress: activity.address,
    from: activity.fromAddress,
    hash: activity.hash,
    to: activity.toAddress,
    value: parseFloat(activity.value),
  };
};

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // ***** SECURITY BREACH ***** //
    // TODO: Restrict refererer access to only alchemy

    log("Request body", req.body);

    try {
      const event = parseRequest(req.body);
      log("Token Transfer Event", event);

      res.status(200).json({
        success: true,
        data: {
          message: "Que pasa viejaa!",
        },
      });
      return;
    } catch (error) {
      log("Error", error);
      res.status(500).json({ false: true, message: "Malformed request" });
      return;
    }
    // Gets Order
    // const orderId = "123";
    // const order = await getOrder(orderId);

    // if (!order) {
    //   res.status(500).json({ false: true, message: "Order ID doesnt exist" });
    //   return;
    // }

    // // If still pending
    // if (order.status === "pending") {
    //   // **************** SEND Email **************** //
    //   sendEmail({
    //     fullname: order.fullname,
    //     email: order.email,
    //     url: "https://entradas.lacrypta.com.ar/entrada/" + orderId,
    //   });

    //   updateOrder(orderId, {
    //     status: "completed",
    //     payment_id: "paymentId",
    //   });
    // }
    // res.redirect(307, "/entrada/" + orderId);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Validation error" });
  }
};

export default request;
