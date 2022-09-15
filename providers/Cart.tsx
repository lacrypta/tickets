import { createContext, useEffect, useState } from "react";
import { ICart } from "../types/cart";
import { IMenuProduct } from "../types/menu";

interface ICartContext {
  cart: ICart;
  addItem(_itemIndex: string): void;
  removeItem(_itemIndex: string): void;
  clear(): void;
}

export const CartContext = createContext<ICartContext>({
  cart: {
    total: 0,
    items: {},
  },
  addItem: () => {},
  removeItem: () => {},
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

  // eslint-disable-next-line no-unused-vars
  const [toggle, setToggle] = useState<boolean>(false); // TODO: remove this

  function addItem(itemIndex: string) {
    cart.items[itemIndex].qty++;
    refreshSum(cart);
    setCart(cart);
    // Forces re-render
    setToggle((s: boolean) => !s);
  }

  const removeItem = (itemIndex: string) => {
    cart.items[itemIndex].qty = Math.max(cart.items[itemIndex].qty - 1, 0);
    refreshSum(cart);
    setCart(cart);
    // Forces re-render
    setToggle((s: boolean) => !s);
  };

  function clear() {
    setCart(generateCart(menu));
  }

  useEffect(() => {
    setCart(generateCart(menu));
  }, [menu]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
