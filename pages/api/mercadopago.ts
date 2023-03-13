import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/private/firebase";
import { ResponseType } from "../../types/request";

// https://mpago.la/15Ehn21
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Invalid Method`");
    }

    const { link } = req.body;
    if (!link) {
      throw new Error("Invalid Link");
    }

    const response = await axios({
      url: link,
      maxRedirects: 0, // default
      validateStatus: function (status) {
        return status === 301;
      },
    });

    const preferenceId = new URL(response.headers.location).searchParams.get(
      "preference-id"
    ) as string;

    if (preferenceId === null) {
      throw new Error("Its fucking null");
    }

    const linkObject = {
      id: preferenceId,
      link,
      type: "link",
      updated: new Date(0),
    };

    const preferenceRef = db.collection("preferences").doc(preferenceId);
    await preferenceRef.set(linkObject);

    res.status(200).json({ success: true, data: linkObject });
  } catch (e: any) {
    console.error(e.message);
    res.status(400).json({ success: false });
  }
}
