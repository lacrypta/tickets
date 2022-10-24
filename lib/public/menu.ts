// Menu functions

import menuJSON from "../../data/menu.json";
import { IOrderItem } from "../../types/order";
import { IMenuProduct } from "../../types/menu";

const { categories, items: menuItems } = menuJSON;

const indexedMenu: { [index: string]: IMenuProduct } = {};

const getMenuItems = () => {
  return menuItems;
};

const generateIndex = () => {
  menuItems.forEach((item) => {
    indexedMenu[item.id] = item;
  });
  indexedMenu;
};

const getTotal = (items: IOrderItem[]) => {
  let total = 0;

  Object.values(items).map((item) => {
    // eslint-disable-next-line no-undef
    total += item.qty * indexedMenu[item.id].price;
  });
  return total;
};

// Just once
generateIndex();

export { categories, indexedMenu, getMenuItems, getTotal };
