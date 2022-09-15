import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  message?: string;
  data?: any;
};

const request = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
  }
  const permit = req.body;
  res.status(200).json({ success: true, data: permit });
};

export default request;
