import { BigNumber } from "ethers";
import { ISignature } from "./Signature";

export interface IVoucher {
  tag: number;

  nonce: BigNumber;
  validSince: BigNumber;
  validUntil: BigNumber;
  payload: string;

  metadata: string;
}

export interface IVoucherStringified {
  tag: number;

  nonce: string;
  validSince: string;
  validUntil: string;
  payload: string;

  metadata: string;
}

export interface IVoucherSigned {
  voucher: IVoucher;
  signature: ISignature;
}

export interface IVoucherSignedStringified {
  voucher: IVoucherStringified;
  signature: ISignature;
}

export interface IVoucherPayload {
  from: string;
  to: string;
  amount: BigNumber;
}

export interface IPurchaseVoucherPayload {
  from: string;
  amount: BigNumber;
  message: string;
}
