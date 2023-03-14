import { useCallback } from "react";
import { IBankPayment, IPayment, IPaymentHook } from "./../../types/payment";
import useOrder from "../useOrder";
import { IOrder } from "../../types/order";

export interface IUseOrderResult extends IPaymentHook {
  payment?: IBankPayment;
  order?: IOrder;
  createPayment: () => Promise<IPayment>;
}

const TICKET_AMOUNT = parseFloat(
  process.env.NEXT_PUBLIC_TICKET_PRICE || "2000"
);

export const useBank = (): IUseOrderResult => {
  const { order, payment, createPayment: createGenericPayment } = useOrder();

  const createPayment = useCallback(async (): Promise<IBankPayment> => {
    const payment: IBankPayment = {
      method: "bank",
      amount: TICKET_AMOUNT,
      status: "waiting",
    };

    return (await createGenericPayment(payment)) as IBankPayment;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    payment: payment as IBankPayment,
    order,
    createPayment,
  };
};

export default useBank;
