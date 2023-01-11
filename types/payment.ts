export interface IPayment {
  id?: string;
  method: PaymentMethod;
  preference_id?: string; // MercadoPago
  address?: string; // Crypto
}

export type PaymentMethod = "crypto" | "mercadopago" | "invitation";
