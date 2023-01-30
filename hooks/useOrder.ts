import { IPayment } from "./../types/payment";
import { OrderContext } from "./../contexts/Order";
import { useCallback, useContext } from "react";
import { IOrder } from "../types/order";
import { IUser } from "../types/user";

export interface IUseOrderResult {
  order?: IOrder;
  payments?: IPayment[];
  payment?: IPayment;
  activePayments?: IPayment[];
  createOrder: (_order: IUser) => Promise<IOrder>;
  createPayment: (_payment: IPayment) => Promise<IPayment>;
  clear: () => void;
}

const useOrder = (): IUseOrderResult => {
  const { order, payment, payments, addOrder, addPayment, clear } =
    useContext(OrderContext);

  const activePayments = payments?.filter((payment) => {
    return payment.status === "waiting";
  });

  // Creates order if it doesn't exist
  const createOrder = useCallback(
    async (user: IUser) => {
      if (order && ["pending", "processing"].includes(order.status)) {
        console.warn("Order already exists");
        return order;
      }
      return addOrder(user);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order]
  );

  // Creates payment if it doesn't exist
  const createPayment = useCallback(
    async (payment: IPayment): Promise<IPayment> => {
      // Check if payment with the method already exists
      const oldPayment = activePayments?.find(
        (el) => el.method === payment.method
      );
      return oldPayment || addPayment(payment);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePayments]
  );

  return {
    order,
    payments,
    payment,
    activePayments,
    createOrder,
    createPayment,
    clear,
  };
};

export default useOrder;
