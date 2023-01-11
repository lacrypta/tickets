import { OrderContext } from "./../contexts/Order";
import { useContext } from "react";
import { IOrder } from "../types/order";

import { addDoc, collection, db } from "../lib/public/firebase";

export interface IUseOrderResult {
  order?: IOrder;
  createOrder: (_order: IOrder) => Promise<IOrder>;
}

const useOrder = (): IUseOrderResult => {
  const { order, setOrder } = useContext(OrderContext);

  const createOrder = async (order: IOrder): Promise<IOrder> => {
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
