import { BigNumber } from "ethers";
import { ISignature } from "./Signature";

export interface ITransferVoucher {
  tag: number;

  nonce: BigNumber;
  deadline: BigNumber;
  payload: string;

  metadata: string;
}

export interface ITransferVoucherSigned {
  voucher: ITransferVoucher;
  signature: ISignature;
}
