import type { NextApiRequest, NextApiResponse } from "next";
import { log } from "../../lib/private/firestore";

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  const logData = await log("log", req.body || {});
  console.info("req.query");
  console.dir(req.query);

  console.info("req.body");
  console.dir(req.body);
  res
    .status(200)
    .json({ success: true, data: "OK", body: req.body, log: logData.id });
};

export default request;
