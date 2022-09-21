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

export const PermitSchema = z.object({
  contract: z.string(),
  name: z.string(),
  spender: z.string(),
  value: z.string(),
  deadline: z.number(),
});

export const SignatureSchema = z.object({
  r: z.string(),
  s: z.string(),
  v: z.number(),
});
