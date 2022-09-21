import z from "zod";
import {
  IPermitData,
  ISignature,
  PermitSchema,
  SignatureSchema,
} from "./crypto";
export interface ISignupRequestBody {
  address: string;
  username: string;
  permitData: IPermitData;
  signature: ISignature;
}

export type ResponseDataType = {
  success: boolean;
  message?: string;
  data?: any;
};

export const SignupSchema = z.object({
  address: z.string(),
  username: z.string(),
  permitData: PermitSchema,
  signature: SignatureSchema,
});
