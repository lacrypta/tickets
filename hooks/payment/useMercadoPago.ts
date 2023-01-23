import { IPayment, IPaymentHook } from "./../../types/payment";
import { IMercadoPagoPayment } from "../../types/payment";
import useOrder from "../useOrder";

export interface IUseOrderResult extends IPaymentHook {
  payment?: IMercadoPagoPayment;
  createPayment: () => Promise<IPayment>;
}

const MERCADOPAGO_AMOUNT = 1000;

export const useMercadoPago = (): IUseOrderResult => {
  const { payment, createPayment: createGenericPayment } = useOrder();
  let mercadoPagoPayment: IMercadoPagoPayment | undefined;

  if (payment?.method === "mercadopago") {
    mercadoPagoPayment = payment as IMercadoPagoPayment;
  }

  const createPayment = async (): Promise<IMercadoPagoPayment> => {
    const payment: IMercadoPagoPayment = {
      method: "mercadopago",
      amount: MERCADOPAGO_AMOUNT,
      status: "waiting",
    };

    return (await createGenericPayment(payment)) as IMercadoPagoPayment;
  };

  return { payment: mercadoPagoPayment, createPayment };
};

export default useMercadoPago;
