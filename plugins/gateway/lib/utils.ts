import {
  ITransferVoucher,
  ITransferVoucherStringified,
} from "./../types/Voucher";
import { BigNumber, ethers } from "ethers";

export const encodeVoucher = ({
  deadline,
  metadata,
  nonce,
  payload,
  tag,
}: ITransferVoucherStringified): ITransferVoucher => {
  return {
    deadline: BigNumber.from(deadline),
    metadata,
    nonce: BigNumber.from(nonce),
    payload,
    tag,
  };
};

export const decodePayload = (payload: string) => {
  const abiCoder = ethers.utils.defaultAbiCoder;
  const [from, to, amount] = abiCoder.decode(
    ["address", "address", "uint256"],
    payload
  );
  return {
    from,
    to,
    amount,
  };
};
