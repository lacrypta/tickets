import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { IOrder } from "../types/order";
import { doc, onSnapshot, db } from "../lib/public/firebase";

interface OrderContextType {
  order?: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder | undefined>>;
}

export const OrderContext = createContext<OrderContextType>({
  setOrder: () => {},
});

export const OrderProvider = ({ children }: any) => {
  const [order, setOrder] = useState<IOrder>();
  const [listeningOrderId, setListeningOrderId] = useState<string>();

  // Subscribe order snapshots
  const subscribeChanges = async () => {
    const orderId = order?.id as string;
    console.info(`Listening for changes (${orderId})...`);

    if (listeningOrderId === orderId) return;
    setListeningOrderId(orderId);

    return onSnapshot(doc(db, "orders", orderId), (doc) => {
      const data = doc.data() as IOrder;
      data.id = doc.id;
      setOrder(data);
    });
  };

  useEffect(() => {
    // Prevent subscribe if its already listening to the orderId
    if (!order?.id || listeningOrderId === order?.id) {
      return;
    }

    subscribeChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, listeningOrderId]);

  useEffect;

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
