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
import useLocalStorage from "../hooks/useLocalStorage";

interface OrderContextType {
  order?: IOrder;
  payments?: IPayment[];
  payment?: IPayment;
  setOrder: Dispatch<SetStateAction<IOrder | undefined>>;
  addOrder: (_user: IUser) => Promise<IOrder>;
  addPayment: (_payment: IPayment) => Promise<IPayment>;
}

export const OrderContext = createContext<OrderContextType>({
  setOrder: () => {},
  addOrder: () => Promise.resolve({} as IOrder),
  addPayment: () => Promise.resolve({} as IPayment),
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

  const [payments, setPayments] = useLocalStorage<IPayment | []>(
    "payments",
    []
  );

  // const [order, setOrder] = useState<IOrder>();
  // const [payment, setPayment] = useState<IPayment>();
  // const [payments, setPayments] = useState<IPayment[]>([]); // All payments

  const [listeningOrderId, setListeningOrderId] = useState<string>();
  const [paymentListener, setPaymentListener] = useState<any>();

  // Event Listener for order changes
  const onOrderChange = useCallback(
    (doc: any) => {
      const data = doc.data() as IOrder;
      data.id = doc.id;

      // If paymentId is found, subscribe payment listener
      if (data.paymentId && data.paymentId !== payment?.id) {
        console.dir("New PaymentId found!");
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
    console.info("Payment updated");
    console.dir(payment);
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

    console.info("Adding order");
    console.dir(order);
    addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    }).then((docRef) => {
      order.id = docRef.id;

      setOrder({ ...order, id: docRef.id });
    });

    setOrder(order);
    return order;
  }, []);

  // Adds Payment
  const addPayment = useCallback(
    async (payment: IPayment): Promise<IPayment> => {
      // Create payment in firestore
      const data: IPaymentFirestore = {
        ...payment,
        status: "waiting", // Makes sure its in waiting status
        orderId: order?.id as string,
        createdAt: serverTimestamp(),
      };

      // Adds temporary payment
      setPayment(data);
      const paymentRef = await addDoc(collection(db, "payments"), data);

      // Updates order payment id
      updateOrderPayment(paymentRef.id);
      const _payment = { id: paymentRef.id, ...data } as IPayment;

      // Updates payments list
      setPayments((old) => old.concat(_payment));
      return _payment;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order?.id]
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
      value={{ order, payment, payments, setOrder, addOrder, addPayment }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
