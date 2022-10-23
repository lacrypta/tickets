import {
  IPurchaseVoucherPayload,
  IVoucher,
  IVoucherStringified,
} from "./../types/Voucher";
import { BigNumber, ethers } from "ethers";

export const encodeVoucher = ({
  deadline,
  metadata,
  nonce,
  payload,
  tag,
}: IVoucherStringified): IVoucher => {
  return {
    deadline: BigNumber.from(deadline),
    metadata,
    nonce: BigNumber.from(nonce),
    payload,
    tag,
  };
};

export const decodePayload = (payload: string): IPurchaseVoucherPayload => {
  const abiCoder = ethers.utils.defaultAbiCoder;
  const [metadata] = abiCoder.decode(
    ["tuple(address, uint256, string)"],
    payload
  );
  const [from, amount, message] = metadata;

  return {
    from,
    amount,
    message,
  };
};
