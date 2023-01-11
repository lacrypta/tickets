import { IPayment } from "./payment";
import { IUser } from "./user";

export interface IOrder {
  id?: string;
  user: IUser;
  payment?: IPayment;
  status: OrderStatus;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
