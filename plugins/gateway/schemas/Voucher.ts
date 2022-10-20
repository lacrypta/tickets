import { z } from "zod";

import { SignatureSchema } from "./Signature";

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
