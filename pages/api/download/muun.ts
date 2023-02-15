import type { NextApiRequest, NextApiResponse } from "next";

const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=io.muun.apollo";
const IOS_URL = "https://apps.apple.com/us/app/muun-wallet/id1482037683";
const MAIN_URL = "https://muun.com";

const request = (req: NextApiRequest, res: NextApiResponse) => {
  const userAgent: String = req.headers["user-agent"] ?? "";
  const device = {
    isMobile: userAgent.indexOf("Mobile") !== -1,
    isAndroid: userAgent.indexOf("Android") !== -1,
  };

  if (!device.isMobile) {
    res.redirect(307, MAIN_URL);
    return;
  }

  res.redirect(307, device.isAndroid ? ANDROID_URL : IOS_URL);
};

export default request;
