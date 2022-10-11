export interface IOrder {
  fullname: string;
  email: string;
  address?: string;
  payment_id?: number;
  payment_method: PaymentMethod;
  preference_id?: string;
  status: OrderStatus;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
export type PaymentMethod = "crypto" | "mercadopago" | "invitation";
