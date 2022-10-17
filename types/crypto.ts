import { z } from "zod";

// Interfaces

export interface IUser {
  username: string;
  address: string;
}

export interface IPermitData {
  contract: string;
  name: string;
  spender: string;
  value: string;
  deadline: number;
}

export interface ISignature {
  r: string;
  s: string;
  v: number;
}

export interface IPermit {
  owner: string;
  spender: string;
  value: string;
  deadline: number;
  v: number;
  r: string;
  s: string;
}
export interface ITransferVoucherPayload {
  from: string;
  to: string;
  amount: string;
}

export interface ITransferVoucher {
  tag: string;

  nonce: string;
  deadline: string;
  payload: ITransferVoucherPayload;

  metadata: string;
}

export interface ITransferVoucherSigned {
  voucher: ITransferVoucher;
  signature: ISignature;
}

// SCHEMAS

export const SignatureSchema = z.object({
  r: z.string(),
  s: z.string(),
  v: z.number(),
});

export const PermitSchema = z.object({
  contract: z.string(),
  name: z.string(),
  spender: z.string(),
  value: z.string(),
  deadline: z.number(),
});

export const TransferVoucherPayloadSchema = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.string(),
});

export const TransferVoucherSchema = z.object({
  tag: z.string(),

  nonce: z.string(),
  deadline: z.string(),
  payload: TransferVoucherPayloadSchema,

  metadata: z.string(),
});

export const TransferVoucherSchemaSigned = z.object({
  voucher: TransferVoucherSchema,
  signature: SignatureSchema,
});
