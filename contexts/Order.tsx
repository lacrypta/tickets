import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";

import {
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
} from "../lib/public/firebase";

import {
  DocumentData,
  DocumentSnapshot,
  serverTimestamp,
} from "@firebase/firestore";

import { IPayment, IPaymentFirestore } from "../types/payment";
import { IUser } from "../types/user";
import { IOrder } from "../types/order";
import useLocalStorage from "use-local-storage";

interface OrderContextType {
  order?: IOrder;
  payments?: IPayment[];
  payment?: IPayment;
  setOrder: Dispatch<SetStateAction<IOrder | undefined>>;
  addOrder: (_user: IUser) => Promise<IOrder>;
  updateOrder: (_user: IUser) => Promise<void>;
  addPayment: (_payment: IPayment) => Promise<IPayment>;
  clear: () => void;
}

export const OrderContext = createContext<OrderContextType>({
  setOrder: () => {},
  addOrder: () => Promise.resolve({} as IOrder),
  updateOrder: () => Promise.resolve(),
  addPayment: () => Promise.resolve({} as IPayment),
  clear: () => {},
});

export const OrderProvider = ({ children }: any) => {
  const [order, setOrder] = useLocalStorage<IOrder | undefined>(
    "order",
    undefined
  );

  const [payment, setPayment] = useLocalStorage<IPayment | undefined>(
    "payment",
    undefined
  );

  const [payments, setPayments] = useLocalStorage<IPayment[]>("payments", []);

  const [listeningOrderId, setListeningOrderId] = useState<string>();
  const [paymentListener, setPaymentListener] = useState<any>();

  // Event Listener for order changes
  const onOrderChange = useCallback(
    (doc: any) => {
      const data = doc.data() as IOrder;
      if (!data) {
        setOrder(undefined);
        setPaymentListener(undefined);
        return;
      }
      data.id = doc.id;

      // If paymentId is found, subscribe payment listener
      if (data.paymentId && data.paymentId !== payment?.id) {
        paymentListener && paymentListener(); // Unsubscribe previous payment listener
        setPaymentListener(subscribePayment(data.paymentId));
      }

      setOrder(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payment?.id, paymentListener]
  );

  // Event Listener for payments changes
  const onPaymentChange = useCallback((doc: DocumentSnapshot<DocumentData>) => {
    const payment: IPayment = { id: doc.id, ...doc.data() } as IPayment;
    setPayment(payment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe order snapshots
  const subscribeOrder = useCallback(
    async (orderId: string) => {
      console.info(`Listening for changes (${orderId})...`);

      if (listeningOrderId === orderId) return;
      setListeningOrderId(orderId);

      return onSnapshot(doc(db, "orders", orderId), onOrderChange);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listeningOrderId]
  );

  // Subscribe payment snapshots
  const subscribePayment = useCallback(async (paymentId: string) => {
    // get snapshot query firestore for order
    return onSnapshot(doc(db, "payments", paymentId), onPaymentChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Adds order
  const addOrder = useCallback(async (userData: IUser): Promise<IOrder> => {
    const order: IOrder = {
      user: userData,
      status: "pending",
    };

    addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    }).then((docRef) => {
      order.id = docRef.id;

      setOrder({ ...order, id: docRef.id });
    });

    setOrder(order);
    return order;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateOrder = useCallback(
    async (userData: IUser): Promise<void> => {
      if (!order?.id) {
        return;
      }
      const orderRef = doc(db, "orders", order.id);
      updateDoc(orderRef, { user: userData });
    },
    [order?.id]
  );

  // Adds Payment
  const addPayment = useCallback(
    async (payment: IPayment): Promise<IPayment> => {
      console.info("order ");
      console.dir(order);

      // Create payment in firestore
      const data: IPaymentFirestore = {
        ...payment,
        status: "waiting", // Makes sure its in waiting status
        orderId: order?.id as string,
        createdAt: serverTimestamp(),
      };

      console.info("data: ");
      console.dir(data);

      // Adds temporary payment
      setPayment(data);
      const paymentRef = await addDoc(collection(db, "payments"), data);

      // Updates order payment id
      updateOrderPayment(paymentRef.id);
      const _payment = { id: paymentRef.id, ...data } as IPayment;

      // Updates payments list
      setPayments((old) => (old as IPayment[]).concat(_payment));
      return _payment;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, order?.id, setPayment, setPayments]
  );

  const updateOrderPayment = useCallback(
    async (paymentId: string) => {
      const orderRef = doc(db, "orders", order?.id as string);
      await updateDoc(orderRef, {
        paymentId,
      });
    },
    [order]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clear = useCallback(() => {
    setOrder(undefined);
    setPayment(undefined);
    setPayments([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const orderId = order?.id as string;
    // Prevent subscribe if its already listening to the orderId
    if (!orderId || listeningOrderId === orderId) {
      return;
    }

    subscribeOrder(orderId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, listeningOrderId]);

  return (
    <OrderContext.Provider
      value={{
        order,
        payment,
        payments,
        setOrder,
        addOrder,
        addPayment,
        updateOrder,
        clear,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
