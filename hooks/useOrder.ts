import { IPayment } from "./../types/payment";
import { OrderContext } from "./../contexts/Order";
import { useContext } from "react";
import { IOrder } from "../types/order";

import {
  addDoc,
  updateDoc,
  collection,
  db,
  doc,
  deleteDoc,
} from "../lib/public/firebase";
import { IUser } from "../types/user";

export interface IUseOrderResult {
  order?: IOrder;
  createOrder: (_order: IUser) => Promise<IOrder>;
  createPayment: (_payment: IPayment) => Promise<IPayment>;
}

const useOrder = (): IUseOrderResult => {
  const { order, payment: currentPayment, setOrder } = useContext(OrderContext);

  const createOrder = async (userData: IUser): Promise<IOrder> => {
    const order: IOrder = {
      user: userData,
      status: "pending",
    };

    const docRef = await addDoc(collection(db, "orders"), order);
    order.id = docRef.id;
    setOrder(order);
    return order;
  };

  const createPayment = async (payment: IPayment): Promise<IPayment> => {
    // Create payment in firestore
    const data = {
      ...payment,
      status: "waiting", // Makes sure its in waiting status
      orderId: order?.id,
    };

    if (currentPayment) {
      await deleteDoc(doc(db, "payments" + currentPayment.id));
    }
    const paymentRef = await addDoc(collection(db, "payments"), data);
    updateDoc(doc(db, "orders/" + order?.id), {
      status: "processing",
      paymentId: paymentRef.id,
    });

    return payment;
  };

  return {
    order,
    createOrder,
    createPayment,
  };
};

export default useOrder;
