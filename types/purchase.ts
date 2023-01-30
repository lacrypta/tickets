import { IOrder } from "./order";
import { IPayment } from "./payment";
import { IUser } from "./user";

export interface IPurchase {
  id?: string;
  user: IUser;
  payment?: IPayment;
  order?: IOrder;
  status: OrderStatus;
}

export type OrderStatus = "ready" | "claimed";