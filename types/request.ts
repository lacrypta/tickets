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

export const OrderSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  address: z.string().optional(),
  paymentMethod: z.enum(["crypto", "mercadopago", "invitation"]),
});

export const CreatePaymentRequestSchema = z.object({
  orderId: z.string(),
});
