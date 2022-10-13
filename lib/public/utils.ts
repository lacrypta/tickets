import { BigNumber, ethers } from "ethers";
import { ITransferVoucher } from "../../types/crypto";

const utf8Encode = new TextEncoder();

const encodeVoucher = (voucher: ITransferVoucher) => {
  return {
    tag: BigNumber.from(10).toString(),
    nonce: BigNumber.from(voucher.nonce).toString(),
    deadline: BigNumber.from(voucher.deadline).toString(),
    payload: ethers.utils.solidityPack(
      ["uint256", "uint256", "uint256"],
      [voucher.payload.from, voucher.payload.to, voucher.payload.amount]
    ),
    metadata: utf8Encode.encode(voucher.metadata),
  };
};

const randomString = (length: number = 10): string => {
  let outString: string = "";
  let inOptions: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < length; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }
  return outString;
};

export { encodeVoucher, randomString };
