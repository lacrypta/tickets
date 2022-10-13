import z from "zod";
import { PaymentMethod } from "./order";
export interface ICreateOrderRequestBody {
  fullname: string;
  email: string;
  address?: string;
  paymentMethod: PaymentMethod;
}

export type ResponseDataType = {
  success: boolean;
  message?: string;
  data?: any;
};

// Payment Methods
export interface ICreatePaymentRequestBody {
  orderId: string;
}

export interface ICreateCryptoPaymentRequestBody {
  orderId: string;
  address: string;
  tx: string;
  amount: string;
}

export interface IClaimCodeRequestBody {
  orderId: string;
  code: string;
}

export const OrderSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  address: z.string().optional(),
  paymentMethod: z.enum(["crypto", "mercadopago", "invitation"]),
});

export const CreatePaymentRequestSchema = z.object({
  orderId: z.string(),
});

export const CreateCryptoPaymentRequestSchema = z.object({
  orderId: z.string(),
  address: z.string(),
  tx: z.string(),
  amount: z.string(),
});

export const ClaimCodeRequestSchema = z.object({
  orderId: z.string(),
  code: z.string(),
});
