import { FieldValue } from "@firebase/firestore";

export interface IPaymentFirestore {
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  preference_id?: string;
  address?: string;
  orderId?: string;
  createdAt?: FieldValue;
}

export interface IPayment extends IPaymentFirestore {
  id?: string;
}

export interface ICryptoPayment extends IPayment {
  method: "crypto";
  address: string;
}

export interface IMercadoPagoPayment extends IPayment {
  method: "mercadopago";
  preference_id?: string;
}

export interface IInvitacionPayment extends IPayment {
  method: "invitation";
  secret: string;
}

export type PaymentMethod = "crypto" | "mercadopago" | "invitation";
export type PaymentStatus = "waiting" | "paid" | "cancelled";

export interface IPaymentHook {
  payment?: IPayment;
  createPayment: () => Promise<IPayment>;
}
