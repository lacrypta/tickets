import { createContext, useEffect, useState } from "react";
import { ICart } from "../types/cart";
import { IMenuItem } from "../types/menu";

interface ICartContext {
  cart?: ICart;
  addItem?: (arg0: any) => void;
  removeItem?: (arg0: any) => void;
  setToggle?: (arg0: any) => void;
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
  const [toggle, setToggle] = useState<boolean>(false);

  const addItem = (itemIndex: string) => {
    cart[itemIndex].qty++;
    setCart(cart);
  };

  const removeItem = (itemIndex: string) => {
    cart[itemIndex].qty--;
    setCart(cart);
  };

  useEffect(() => {
    setCart(generateCart(menu));
  }, [menu]);

  console.warn("Check unnecessay toggle. Bind needed", toggle);
  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        setToggle,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
