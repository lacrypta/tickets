export interface IOrderItem {
  id: string;
  qty: number;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export const PaymentMethods = {
  MERCADOPAGO: "mercadopago",
  PERONIO: "peronio",
  CASH: "cash",
};
