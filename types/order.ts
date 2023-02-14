import { IUser } from "./user";

export interface IOrder {
  id?: string;
  user: IUser;
  paymentId?: string;
  purchaseId?: string;
  notion_id?: string;
  status: OrderStatus;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
