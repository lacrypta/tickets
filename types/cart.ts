import { IMenuItem } from "./menu";

export interface ICart {
  [index: string]: ICartItem;
}

export interface ICartItem {
  item: IMenuItem;
  qty: number;
}
