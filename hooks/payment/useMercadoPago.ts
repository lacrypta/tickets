import { IPayment, IPaymentHook } from "./../../types/payment";
import { IMercadoPagoPayment } from "../../types/payment";
import useOrder from "../useOrder";

export interface IUseOrderResult extends IPaymentHook {
  payment?: IMercadoPagoPayment;
  createPayment: () => Promise<IPayment>;
}

const MERCADOPAGO_AMOUNT = 1000;

export const useMercadoPago = (): IUseOrderResult => {
  const { order, createPayment: createGenericPayment } = useOrder();
  const payment: IPayment | undefined = order?.payment;
  let mercadoPagoPayment: IMercadoPagoPayment | undefined;

  if (payment?.method === "mercadopago") {
    mercadoPagoPayment = payment as IMercadoPagoPayment;
  }

  const getPreferenceId = async (): Promise<string> => {
    return Math.random().toString().substring(2, 16);
  };

  const createPayment = async (): Promise<IMercadoPagoPayment> => {
    const preferenceId = await getPreferenceId();
    const payment: IMercadoPagoPayment = {
      id: Math.random().toString().substring(2, 16),
      method: "mercadopago",
      amount: MERCADOPAGO_AMOUNT,
      preference_id: preferenceId,
      status: "waiting",
    };

    return (await createGenericPayment(payment)) as IMercadoPagoPayment;
  };

  return { payment: mercadoPagoPayment, createPayment };
};

export default useMercadoPago;
