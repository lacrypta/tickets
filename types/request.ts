import z from "zod";

import {
  IPermitData,
  ISignature,
  ITransferVoucherSigned,
  PermitSchema,
  SignatureSchema,
  TransferVoucherSchemaSigned,
} from "./crypto";
export interface ISignupRequestBody {
  address: string;
  username: string;
  permitData: IPermitData;
  signature: ISignature;
}

export interface IPaymentRequestBody {
  order: string;
  voucher: ITransferVoucherSigned;
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

export const PaymentSchema = z.object({
  order: z.string(),
  voucher: TransferVoucherSchemaSigned,
});
