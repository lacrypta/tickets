import { createContext, useEffect, useState } from "react";
import { ICart } from "../types/cart";
import { IMenuItem } from "../types/menu";

interface ICartContext {
  cart?: ICart;
  addItem?: (arg0: any) => void;
  removeItem?: (arg0: any) => void;
}

export const CartContext = createContext<ICartContext>({});

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

  const addItem = (itemIndex: string) => {
    console.info("adding item");
    console.dir(itemIndex);
    console.dir(cart[itemIndex]);
    cart[itemIndex].qty++;
    setCart(cart);

    console.dir(cart);
  };

  const removeItem = (menuItem: string) => {
    console.info("removing item");
    console.dir(menuItem);
  };

  useEffect(() => {
    setCart(generateCart(menu));
  }, [menu]);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
