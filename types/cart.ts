import { IMenuProduct } from "./menu";

export interface ICart {
  total: number;
  items: { [index: string]: ICartItem };
}

export interface ICartItem {
  product: IMenuProduct;
  qty: number;
}

export interface IOrderItem {
  id: string;
  qty: number;
}
