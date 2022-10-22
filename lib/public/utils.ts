import { ITransferVoucherSignedStringified } from "./../../plugins/gateway/types/Voucher";
import { ITransferVoucherSigned } from "../../plugins/gateway/types/Voucher";
import { ICart } from "../../types/cart";

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
  const { r, s, v, full } = voucher.signature;
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
      full,
    },
  };
};

const generateMessage = (orderId: string, total: string, _cart?: ICart) => {
  const formattedAmount = parseFloat(total).toFixed(2);
  return `Pagar la cuenta de la Orden #${orderId}\nMonto: ${formattedAmount}`;
};

export { generatePermitData, formatVoucher, generateMessage };
