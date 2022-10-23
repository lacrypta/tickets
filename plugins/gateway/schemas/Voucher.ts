import { z } from "zod";

import { SignatureSchema } from "./Signature";

export const TransferVoucherSchema = z.object({
  tag: z.number(),

  nonce: z.string(),
  deadline: z.string(),
  payload: z.string(),

  metadata: z.string(),
});

export const TransferVoucherSchemaSigned = z.object({
  voucher: TransferVoucherSchema,
  signature: SignatureSchema,
});
