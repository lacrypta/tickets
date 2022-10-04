import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IOrderContext {
  orderId: string;
  setOrderId: Dispatch<SetStateAction<string>>;
  orderTotal: string;
  setOrderTotal: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

export const OrderContext = createContext<IOrderContext>({
  orderId: "",
  setOrderId: () => {},
  orderTotal: "0",
  setOrderTotal: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isSuccess: false,
  setIsSuccess: () => {},
  isError: false,
  setIsError: () => {},
  error: "",
  setError: () => {},
});

interface IOrderProviderProps {
  children: any;
  //   menu: IMenuProduct[];
}

export const OrderProvider = ({ children }: IOrderProviderProps) => {
  const [orderId, setOrderId] = useState<string>("");
  const [orderTotal, setOrderTotal] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  return (
    <OrderContext.Provider
      value={{
        orderId,
        setOrderId,
        orderTotal,
        setOrderTotal,
        isLoading,
        setIsLoading,
        isSuccess,
        setIsSuccess,
        isError,
        setIsError,
        error,
        setError,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
