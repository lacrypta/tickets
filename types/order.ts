import { IUser } from "./user";

export interface IOrder {
  id?: string;
  user: IUser;
  paymentId?: string;
  status: OrderStatus;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
