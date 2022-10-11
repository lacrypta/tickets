import type { NextApiRequest, NextApiResponse } from "next";
import { log } from "../../lib/private/firestore";

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  log("log", req.body);
  res.status(200).json({ success: true, data: "OK" });
};

export default request;
