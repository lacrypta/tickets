import z from "zod";
import { SignatureSchema } from "../plugins/gateway/schemas/Signature";
import { TransferVoucherSchemaSigned } from "../plugins/gateway/schemas/Voucher";
import { ISignature } from "../plugins/gateway/types/Signature";
import { ITransferVoucherSignedStringified } from "../plugins/gateway/types/Voucher";
import { IOrderItem } from "./cart";
import { IPermitData, PermitSchema } from "./crypto";
export interface ISignupRequestBody {
  address: string;
  username: string;
  permitData: IPermitData;
  signature: ISignature;
}

export interface IERC20PaymentRequestBody {
  orderId: string;
  voucher: ITransferVoucherSignedStringified;
}

export interface ICreateOrderRequestBody {
  address?: string;
  paymentMethod: string;
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

export const ERC20PaymentSchema = z.object({
  orderId: z.string(),
  voucher: TransferVoucherSchemaSigned,
});

export const OrderSchema = z.object({
  address: z.string().optional(),
  paymentMethod: z.enum(["mercadopago", "peronio"]),
  items: z.array(
    z.object({
      id: z.string(),
      qty: z.number(),
    })
  ),
});
