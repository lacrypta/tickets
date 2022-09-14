import { createContext, useEffect, useState } from "react";
import { ICart } from "../types/cart";
import { IMenuItem } from "../types/menu";

interface ICartContext {
  cart?: ICart;
  menuItems: IMenuItem[];
  addItem?: (arg0: any) => void;
  removeItem?: (arg0: any) => void;
}

export const CartContext = createContext<ICartContext>({
  menuItems: [],
});

interface ICartProviderProps {
  children: any;
  menu: IMenuItem[];
}

const generateCart = (menuItems: IMenuItem[]): ICart => {
  const cart: ICart = {};
  menuItems.map((item) => {
    cart[item.id] = {
      item,
      qty: 0,
    };
  });
  return cart;
};

export const CartProvider = ({ menu, children }: ICartProviderProps) => {
  const [cart, setCart] = useState<ICart>({});
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  const addItem = (menuItem: IMenuItem) => {
    console.info("adding item");
    console.dir(menuItem);
    console.dir(cart);
  };

  const removeItem = (menuItem: IMenuItem) => {
    console.info("removing item");
    console.dir(menuItem);
  };

  useEffect(() => {
    setCart(generateCart(menu));
    setMenuItems(menu);
  }, [menu]);

  return (
    <CartContext.Provider value={{ cart, menuItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
