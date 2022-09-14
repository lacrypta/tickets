import { createContext, useEffect, useState } from "react";
import { ICart } from "../types/cart";
import { IMenuProduct } from "../types/menu";

interface ICartContext {
  cart: ICart;
  addItem?: (arg0: any) => void;
  removeItem?: (arg0: any) => void;
  setToggle?: (arg0: any) => void;
  clear: () => void;
}

export const CartContext = createContext<ICartContext>({
  cart: {
    total: 0,
    items: {},
  },
  clear: () => {},
});

interface ICartProviderProps {
  children: any;
  menu: IMenuProduct[];
}

const generateCart = (menuItems: IMenuProduct[]): ICart => {
  const cart: ICart = { items: {}, total: 0 };
  menuItems.map((product) => {
    cart.items[product.id] = {
      product,
      qty: 0,
    };
  });

  return cart;
};

const refreshSum = (cart: ICart) => {
  let total = 0;
  Object.values(cart.items).map((item) => {
    total += item.qty * item.product.price;
  });
  cart.total = total;
};

export const CartProvider = ({ menu, children }: ICartProviderProps) => {
  const [cart, setCart] = useState<ICart>({
    total: 0,
    items: {},
  });
  const [toggle, setToggle] = useState<boolean>(false);

  const addItem = (itemIndex: string) => {
    cart.items[itemIndex].qty++;
    refreshSum(cart);
    setCart(cart);
  };

  const removeItem = (itemIndex: string) => {
    cart.items[itemIndex].qty = Math.max(cart.items[itemIndex].qty - 1, 0);
    refreshSum(cart);
    setCart(cart);
  };

  function clear() {
    setCart(generateCart(menu));
  }

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
        clear,
        setToggle, // TODO: Remove this
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
