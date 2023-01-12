import { OrderContext } from "./../contexts/Order";
import { useContext } from "react";
import { IOrder } from "../types/order";

import { addDoc, collection, db } from "../lib/public/firebase";
import { IUser } from "../types/user";

export interface IUseOrderResult {
  order?: IOrder;
  createOrder: (_order: IUser) => Promise<IOrder>;
}

const useOrder = (): IUseOrderResult => {
  const { order, setOrder } = useContext(OrderContext);

  const createOrder = async (userData: IUser): Promise<IOrder> => {
    const order: IOrder = {
      user: userData,
      status: "pending",
    };

    console.info("Order data:");
    console.dir(order);

    const docRef = await addDoc(collection(db, "orders"), order);
    order.id = docRef.id;
    setOrder(order);
    return order;
  };

  return {
    order,
    createOrder,
  };
};

export default useOrder;
