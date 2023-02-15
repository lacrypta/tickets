import { IOrder } from "./order";
import { IPayment } from "./payment";
import { IUser } from "./user";

export interface IPurchase {
  id?: string;
  user: IUser;
  payment?: IPayment;
  order?: IOrder;
  lnUrlw?: string;
  notion_id?: string;
  status: PurchaseStatus;
}

export type PurchaseStatus = "ready" | "claimed";
