import { NextApiRequest, NextApiResponse } from "next";
import { addCode } from "../../../../lib/private/firestore";
import { randomString } from "../../../../lib/public/utils";
import { ResponseDataType } from "../../../../types/request";

const request = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) => {
  // Needs Code
  if (process.env.PRIVATE_ADMIN_CODE !== req.query.code) {
    res.status(401).json({
      success: false,
      message: "Código Incorrecto, puto!",
    });

    return;
  }

  // Generate RandomString
  const code = randomString(10);

  // Generate Code
  await addCode(code);

  // Perfect!
  res.status(200).json({
    success: true,
    data: {
      code,
    },
  });
};

export default request;
