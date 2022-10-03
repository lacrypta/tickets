import z from "zod";
import { IOrderItem } from "./cart";
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
  orderId: string;
  voucher: ITransferVoucherSigned;
}
export interface ICreateOrderRequestBody {
  address: string;
  items: IOrderItem[];
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
  orderId: z.string(),
  voucher: TransferVoucherSchemaSigned,
});

export const OrderSchema = z.object({
  address: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      qty: z.number(),
    })
  ),
});
