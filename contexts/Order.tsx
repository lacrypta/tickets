import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import { IOrder } from "../types/order";
import { doc, onSnapshot, db } from "../lib/public/firebase";
import { IPayment } from "../types/payment";

interface OrderContextType {
  order?: IOrder;
  payment?: IPayment;
  setOrder: Dispatch<SetStateAction<IOrder | undefined>>;
}

export const OrderContext = createContext<OrderContextType>({
  setOrder: () => {},
});

export const OrderProvider = ({ children }: any) => {
  const [order, setOrder] = useState<IOrder>();
  const [payment, setPayment] = useState<IPayment>();

  const [listeningOrderId, setListeningOrderId] = useState<string>();
  const [paymentListener, setPaymentListener] = useState<any>();

  const onOrderChange = (doc: any) => {
    const data = doc.data() as IOrder;
    data.id = doc.id;

    // If paymentId is found, subscribe payment listener
    if (data.paymentId && data.paymentId !== payment?.id) {
      console.dir("New PaymentId found!");
      paymentListener && paymentListener(); // Unsubscribe previous payment listener
      setPaymentListener(subscribePayment(data.paymentId));
    }

    // If no payment is found, unsubscribe payment listener
    if (!data.paymentId) {
      paymentListener && paymentListener(); // Unsubscribe previous payment listener
    }

    setOrder(data);
  };

  const onPaymentChange = (doc: any) => {
    const data = doc.data() as IPayment;
    data.id = doc.id;
    setPayment(data);
    console.dir(data);
  };

  // Subscribe order snapshots
  const subscribeOrder = useCallback(async () => {
    const orderId = order?.id as string;
    console.info(`Listening for changes (${orderId})...`);

    if (listeningOrderId === orderId) return;
    setListeningOrderId(orderId);

    return onSnapshot(doc(db, "orders", orderId), onOrderChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, listeningOrderId, paymentListener]);

  // Subscribe payment snapshots
  const subscribePayment = async (paymentId: string) => {
    console.info("Subscribe for PaymentID", paymentId);
    return onSnapshot(doc(db, "payments", paymentId), onPaymentChange);
  };

  useEffect(() => {
    // Prevent subscribe if its already listening to the orderId
    if (!order?.id || listeningOrderId === order?.id) {
      return;
    }
    subscribeOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, listeningOrderId]);

  useEffect;

  return (
    <OrderContext.Provider value={{ order, payment, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
