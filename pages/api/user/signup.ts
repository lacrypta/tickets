import type { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "../../../lib/private/firestore";

import {
  ISignupRequestBody,
  ResponseDataType,
  SignupSchema,
} from "../../../types/request";

// TODO: Validate Permit
const isValidPermit = (permitData, signature): boolean => {
  return true;
};

const request = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST method is allowed" });
    return;
  }

  try {
    SignupSchema.parse(req.body);
  } catch (e) {
    res.status(400).json({ success: false, message: "Malformed request" });
  }

  const { address, username, permitData, signature }: ISignupRequestBody =
    req.body;

  if (!isValidPermit(permitData, signature)) {
    res.status(406).json({ success: false, message: "Invalid Permit" });
    return;
  }

  await addUser(username, address, {
    owner: address,
    spender: permitData.spender,
    deadline: permitData.deadline,
    value: permitData.value,
    r: signature.r,
    s: signature.s,
    v: signature.v,
  });

  res.status(200).json({ success: true, data: "Ohh yeahh!!" });
};

export default request;
