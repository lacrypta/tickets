import { db, collection, getDocs } from "../../lib/public/firebase";
// Menu functions

import menuJSON from "../../data/menu.json";
import { IOrderItem } from "../../types/order";
import { IMenuProduct } from "../../types/menu";

import cachedItems from "../../cached/menu.json";

const { categories } = menuJSON;

const indexedMenu: { [index: string]: IMenuProduct } = {};

const menuRef = collection(db, "menu");
let menuItems: IMenuProduct[];

const CACHED = true;

const generateMenuItems = async (): Promise<void> => {
  if (CACHED) {
    menuItems = cachedItems;
  } else {
    const snapshot = await getDocs(menuRef);
    menuItems = snapshot.docs.map((doc) => {
      const { name, description, cat, price } = doc.data();
      return {
        id: doc.id,
        name,
        description,
        cat,
        price,
      };
    });
  }

  generateIndex();
};

const getMenuItems = async (): Promise<IMenuProduct[]> => {
  if (!menuItems) {
    await generateMenuItems();
  }

  return menuItems;
};

const generateIndex = () => {
  menuItems.forEach((item) => {
    indexedMenu[item.id] = item;
  });
  indexedMenu;
};

const getIndexedMenu = async () => {
  if (!menuItems) {
    generateMenuItems();
  }
  return indexedMenu;
};

const getTotal = async (items: IOrderItem[]): Promise<number> => {
  if (!menuItems) {
    await generateMenuItems();
  }
  let total = 0;

  Object.values(items).map((item) => {
    // eslint-disable-next-line no-undef
    total += item.qty * indexedMenu[item.id].price;
  });
  return total;
};

export { categories, getIndexedMenu, getMenuItems, getTotal };
