import { createContext } from "react";

interface OrderContextType {}

export const OrderContext = createContext<OrderContextType>({});

export const OrderProvider = ({ children }: any) => {
  return <OrderContext.Provider value={{}}>{children}</OrderContext.Provider>;
};

export default OrderContext;
