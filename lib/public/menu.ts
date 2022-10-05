// Menu functions

import menuItems from "../../data/menu.json";
import { IOrderItem } from "../../types/cart";

const indexedMenuPrices: { [index: string]: number } = {};

const getMenuItems = () => {
  return menuItems;
};

const generateIndex = () => {
  menuItems.forEach((item) => {
    indexedMenuPrices[item.id] = item.price;
  });
  indexedMenuPrices;
};

const getTotal = (items: IOrderItem[]) => {
  let total = 0;

  Object.values(items).map((item) => {
    // eslint-disable-next-line no-undef
    total += item.qty * indexedMenuPrices[item.id];
  });
  return total;
};

// Just once
generateIndex();

export { getMenuItems, getTotal };
