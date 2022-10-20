import { BigNumber } from "ethers";
import { ISignature } from "./Signature";

export interface ITransferVoucher {
  tag: number;

  nonce: BigNumber;
  deadline: BigNumber;
  payload: string;

  metadata: string;
}

export interface ITransferVoucherStringified {
  tag: number;

  nonce: string;
  deadline: string;
  payload: string;

  metadata: string;
}

export interface ITransferVoucherSigned {
  voucher: ITransferVoucher;
  signature: ISignature;
}

export interface ITransferVoucherSignedStringified {
  voucher: ITransferVoucherStringified;
  signature: ISignature;
}
