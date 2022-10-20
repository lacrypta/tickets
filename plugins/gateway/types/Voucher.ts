import { ISignature } from "./Signature";

export interface ITransferVoucherPayload {
  from: string;
  to: string;
  amount: string;
}

export interface ITransferVoucher {
  tag: number;

  nonce: string;
  deadline: string;
  payload: ITransferVoucherPayload;

  metadata: string;
}

export interface ITransferVoucherSigned {
  voucher: ITransferVoucher;
  signature: ISignature;
}
