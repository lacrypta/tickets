import type { NextApiRequest, NextApiResponse } from "next";

import mercadopago from "mercadopago";
import { ConfigTokenOption } from "mercadopago/configuration";

import { getOrder, updateOrder } from "../../../../lib/private/firestore";
import { CreateMercadoPagoRequestSchema } from "../../../../types/request";

const HOSTNAME =
  process.env.NEXT_PUBLIC_HOSTNAME || "https://bar.lacrypta.com.ar";
const config: ConfigTokenOption = {
  access_token: process.env.MP_SECRET_TOKEN || "",
};

const TICKET_PRICE = process.env.NEXT_PUBLIC_TICKET_PRICE || "2000";

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: Limit user order creation by time
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
    return;
  }

  // Validation
  try {
    CreateMercadoPagoRequestSchema.parse(req.body);
  } catch (e) {
    res.status(400).json({ success: false, message: "Malformed request" });
  }

  const { orderId } = req.body;

  // Checek Order existance
  if (!(await getOrder(orderId))) {
    res.status(406).json({ success: false, message: "Order doesnt exist" });
  }

  // Setup MercadoPago
  mercadopago.configure(config);

  let preference;
  try {
    preference = (
      await mercadopago.preferences.create({
        items: [
          {
            title: "La Crypta - Halloween",
            quantity: 1,
            currency_id: "ARS",
            unit_price: parseInt(TICKET_PRICE),
            id: orderId,
          },
        ],
        back_urls: {
          success: HOSTNAME + "/api/gateway/mercadopago/webhook",
        },
        additional_info: String(orderId),
        statement_descriptor: "La Crypta - Bar",
        auto_return: "all",
        notification_url: process.env.MP_NOTIFICATION_URL,
      })
    ).body;
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "MercadoPago Error",
    });
    return;
  }

  // Updates order
  updateOrder(orderId, {
    preference_id: preference.id,
    status: "processing",
  });

  res.status(200).json({
    success: true,
    data: {
      orderId,
      preferenceId: preference.id,
    },
  });
};

export default request;
