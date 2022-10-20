import { BigNumber, ethers } from "ethers";
import { ITransferVoucher } from "../../plugins/gateway/types/Voucher";

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

export { encodeVoucher, generatePermitData };
