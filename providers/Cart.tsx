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
  const cart: ICart = { items: {}, total: 0 };
  menuItems.map((item) => {
    cart.items[item.id] = {
      item,
      qty: 0,
    };
  });

  return cart;
};

const refreshSum = (cart: ICart) => {
  let total = 0;
  Object.values(cart.items).map((item) => {
    total += item.qty * item.item.price;
  });
  cart.total = total;
};

export const CartProvider = ({ menu, children }: ICartProviderProps) => {
  const [cart, setCart] = useState<ICart>({});
  const [toggle, setToggle] = useState<boolean>(false);

  const addItem = (itemIndex: string) => {
    cart.items[itemIndex].qty++;
    refreshSum(cart);
    setCart(cart);
  };

  const removeItem = (itemIndex: string) => {
    cart.items[itemIndex].qty--;
    refreshSum(cart);
    setCart(cart);
  };

  useEffect(() => {
    setCart(generateCart(menu));
  }, [menu]);

  console.warn("Check unnecessary toggle. Bind needed", toggle);
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
