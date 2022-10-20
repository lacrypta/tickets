import { ITransferVoucherSignedStringified } from "./../../plugins/gateway/types/Voucher";
import { BigNumber, ethers } from "ethers";
import {
  ITransferVoucher,
  ITransferVoucherSigned,
} from "../../plugins/gateway/types/Voucher";

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

const generatePermitData = (
  contractAddress?: string,
  gatewayAddress?: string,
  signupTTL?: string
) => {
  return {
    name: "Peronio",
    contract: contractAddress ?? "",
    spender: gatewayAddress ?? "",
    value: "1000000000000000000000000000000000000000000000", // TODO: Generate proper unlimited
    deadline: Math.floor(Date.now() / 1000) + parseInt(signupTTL || "43200"), // 12 hours
  };
};

const formatVoucher = (
  voucher: ITransferVoucherSigned
): ITransferVoucherSignedStringified => {
  const { deadline, metadata, nonce, payload, tag } = voucher.voucher;
  const { r, s, v } = voucher.signature;
  return {
    voucher: {
      deadline: deadline.toString(),
      metadata,
      nonce: nonce.toString(),
      payload,
      tag: tag,
    },
    signature: {
      r,
      s,
      v,
    },
  };
};

export { encodeVoucher, generatePermitData, formatVoucher };
