import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/private/firebase";
import { ResponseType } from "../../types/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Invalid Method`");
    }

    if (req.body.password !== process.env.PASSWORD) {
      throw new Error("Invalid Password");
    }

    const userId = "admin";
    const additionalClaims = {
      adminAccount: true,
    };

    const token = await auth.createCustomToken(userId, additionalClaims);

    res.status(200).json({ success: true, data: { token } });
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ success: false });
  }
}
