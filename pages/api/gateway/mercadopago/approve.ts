import type { NextApiRequest, NextApiResponse } from "next";

const REDIRECT_URL = "/pepi";

const request = (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(307, REDIRECT_URL);
};

export default request;
