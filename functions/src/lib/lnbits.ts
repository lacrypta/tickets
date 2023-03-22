import { LnUrlWithdrawBody, LnUrlWithdrawData } from "./../../../types/lnbits";
import axios from "axios";

export const generateWithdrawLink = async (
  sats: number,
  webhookUrl: string | undefined
) => {
  const url = process.env.LNBITS_URL + "withdraw/api/v1/links";
  const body: LnUrlWithdrawBody = {
    title: "Curso de La Crypta",
    max_withdrawable: sats,
    min_withdrawable: sats,
    is_unique: true,
    uses: 1,
    wait_time: 1,
    webhook_url: webhookUrl,
  };

  const { data, status } = await axios.post<LnUrlWithdrawData>(url, body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Api-Key": process.env.LNBITS_API_KEY || "",
    },
  });

  if (status !== 201) {
    throw new Error("Invalid");
  }

  return data.lnurl;
};
