import { ITransferVoucherSignedStringified } from "./../../plugins/gateway/types/Voucher";
import { ITransferVoucherSigned } from "../../plugins/gateway/types/Voucher";

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

export { generatePermitData, formatVoucher };
