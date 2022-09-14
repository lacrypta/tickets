import { IMenuItem } from "./menu";

export interface ICart {
  total: number;
  items: { [index: string]: ICartItem };
}

export interface ICartItem {
  item: IMenuItem;
  qty: number;
}
