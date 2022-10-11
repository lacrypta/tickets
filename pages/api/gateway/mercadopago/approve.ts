import type { NextApiRequest, NextApiResponse } from "next";
// import { getOrder } from "../../../../lib/private/firestore";
import { z } from "zod";
import mercadopago from "mercadopago";

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const paymentId = z
      .number()
      .parse(parseInt(z.string().parse(req.query.payment_id)));
    const payment = (await mercadopago.payment.get(paymentId)).body;

    // Not yet approved
    if (payment.status !== "approved") {
      res.status(500).json({ success: true, message: "Not yet approved" });
      return;
    }

    console.info(payment);
    console.dir(payment);

    res
      .status(200)
      .json({ success: true, message: "Holaaa", query: req.query, payment });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Validation error" });
  }

  // res.redirect(307, REDIRECT_URL);
};

export default request;
