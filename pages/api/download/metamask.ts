import type { NextApiRequest, NextApiResponse } from "next";

const ANDROID_URL = "https://metamask.app.link/bxwkE8oF99";
const IOS_URL = "https://metamask.app.link/skAH3BaF99";

const request = (req: NextApiRequest, res: NextApiResponse) => {
  const userAgent: String = req.headers["user-agent"] ?? "";
  const device = {
    isMobile: userAgent.indexOf("Mobile") !== -1,
    isAndroid: userAgent.indexOf("Android") !== -1,
  };

  if (!device.isMobile) {
    return res.status(200).json("No es un dispositivo movil");
  }

  res.redirect(307, device.isAndroid ? ANDROID_URL : IOS_URL);
};

export default request;
