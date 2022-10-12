import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { db, onSnapshot, doc } from "../lib/public/firebase";
import { IOrder } from "../types/order";

interface IOrderContext {
  orderId: string;
  setOrderId: Dispatch<SetStateAction<string>>;
  fullname: string;
  setFullname: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  order?: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder | undefined>>;
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
  isPayed: boolean;
  setIsPayed: Dispatch<SetStateAction<boolean>>;
  clear: () => void;
}

export const OrderContext = createContext<IOrderContext>({
  orderId: "",
  setOrderId: () => {},
  fullname: "",
  setFullname: () => {},
  email: "",
  setEmail: () => {},
  order: undefined,
  setOrder: (_) => {},
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
  isPayed: false,
  setIsPayed: () => {},
  clear: () => {},
});

interface IOrderProviderProps {
  children: any;
  //   menu: IMenuProduct[];
}

export const OrderProvider = ({ children }: IOrderProviderProps) => {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [order, setOrder] = useState<IOrder>();

  const [orderId, setOrderId] = useState<string>("");
  const [orderTotal, setOrderTotal] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPayed, setIsPayed] = useState<boolean>(false);

  const clear = () => {
    setIsPayed(false);
    setOrderId("");
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError("");
  };

  // Subscribe for OrderID change
  useEffect(() => {
    if (!orderId) {
      return;
    }
    setIsLoading(true);
    const orderRef = doc(db, "orders", orderId);
    const unsubscribe = onSnapshot(orderRef, {
      next: (snapshot) => {
        console.info("Order updated");
        console.dir(snapshot.data());
        const order: any = snapshot.data(); // TODO: tidy this
        if (!order) {
          setIsError(true);
          setError("Not found");
        }
        setIsLoading(false);
        setOrder(order);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [orderId, setOrder]);

  return (
    <OrderContext.Provider
      value={{
        orderId,
        setOrderId,
        fullname,
        setFullname,
        email,
        setEmail,
        order,
        setOrder,
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
        isPayed,
        setIsPayed,
        clear,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
