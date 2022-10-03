import { BigNumber } from "ethers";
import { z } from "zod";

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

export interface ITransferVoucher {
  from: string;
  to: string;
  amount: string;
  deadline: string;
  fee: string;
  nonce: string;
}

export interface ITransferVoucherSigned {
  payload: ITransferVoucher;
  signature: ISignature;
}

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

export const TransferVoucherSchema = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.string(),
  deadline: z.string(),
  fee: z.string(),
  nonce: z.string(),
});

export const TransferVoucherSchemaSigned = z.object({
  payload: TransferVoucherSchema,
  signature: SignatureSchema,
});
