import { isAddress } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../lib/firestore";

import { ResponseDataType } from "../../../types/request";

const request = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) => {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({ success: false, message: "Only GET method is allowed" });
    return;
  }

  const address = req.query.pid ?? "";
  if (!isAddress(address)) {
    res.status(400).json({ success: false, data: "Invalid address" });
    return;
  }

  const user = await getUser(address);
  console.dir(user);

  res.status(200).json({ success: true, data: user });
};

export default request;
