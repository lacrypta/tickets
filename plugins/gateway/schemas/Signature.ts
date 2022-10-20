import { z } from "zod";

export const SignatureSchema = z.object({
  r: z.string(),
  s: z.string(),
  v: z.number(),
});
