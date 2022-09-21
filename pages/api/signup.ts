import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import { ISignupRequestBody } from "../../types/request";

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
  const permit: ISignupRequestBody = req.body;
  res.status(200).json({ success: true, data: permit });
};

export default request;
