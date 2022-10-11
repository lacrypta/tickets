import type { NextApiRequest, NextApiResponse } from "next";
// import { addOrder } from "../../../lib/private/firestore";

import mercadopago from "mercadopago";
import { PreferenceItem } from "mercadopago/models";
import { ConfigTokenOption } from "mercadopago/configuration";
import { getOrder } from "../../../../lib/private/firestore";
import { CreatePaymentRequestSchema } from "../../../../types/request";

const HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME || "http://localhost:3000/";

const orderItem: PreferenceItem = {
  title: "La Crypta - Halloween",
  quantity: 1,
  currency_id: "ARS",
  unit_price: 2000,
};

const config: ConfigTokenOption = {
  access_token: process.env.NEXT_PUBLIC_MP_SECRET_TOKEN || "",
};

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: Limit user order creation by time
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
    return;
  }

  try {
    CreatePaymentRequestSchema.parse(req.body);
  } catch (e) {
    res.status(400).json({ success: false, message: "Malformed request" });
  }

  const { orderId } = req.body;

  if (!(await getOrder(orderId))) {
    res.status(406).json({ success: false, message: "Order doesnt exist" });
  }

  mercadopago.configure(config);

  const preference = (
    await mercadopago.preferences.create({
      items: [orderItem],
      back_urls: {
        success: HOSTNAME + "/api/gateway/approve",
      },
      additional_info: String(orderId),
      auto_return: "all",
    })
  ).body;

  res.status(200).json({
    success: true,
    data: {
      orderId,
      preferenceId: preference.id,
    },
  });
};

export default request;
