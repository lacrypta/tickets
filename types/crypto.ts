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

export interface IPermit {
  owner: string;
  spender: string;
  value: string;
  deadline: number;
  v: number;
  r: string;
  s: string;
}

// SCHEMAS

export const PermitSchema = z.object({
  contract: z.string(),
  name: z.string(),
  spender: z.string(),
  value: z.string(),
  deadline: z.number(),
});
