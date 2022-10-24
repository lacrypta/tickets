export interface IOrderItem {
  id: string;
  qty: number;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export type PosStatus =
  | "request_payment"
  | "print_pending"
  | "printed"
  | "done";

export const PaymentMethods = {
  MERCADOPAGO: "mercadopago",
  PERONIO: "peronio",
  CASH: "cash",
};
