import { useCallback, useEffect, useState } from "react";
import { IPayment, IPaymentHook } from "./../../types/payment";
import { IMercadoPagoPayment } from "../../types/payment";
import useOrder from "../useOrder";
import { useMercadopago as useMercadopagoSDK } from "react-sdk-mercadopago";

export interface IUseOrderResult extends IPaymentHook {
  payment?: IMercadoPagoPayment;
  sdk?: any;
  preferenceId?: string;
  link?: string;
  clearCheckout: () => void;
  checkout?: () => void;
  createPayment: () => Promise<IPayment>;
}

const MERCADOPAGO_AMOUNT = parseFloat(
  process.env.NEXT_PUBLIC_TICKET_PRICE || "2000"
);

export const useMercadoPago = (): IUseOrderResult => {
  const { payment, createPayment: createGenericPayment } = useOrder();
  const [preferenceId, setPreferenceId] = useState<string>();
  const [link, setLink] = useState<string>();
  const [checkoutObject, setCheckoutObject] = useState<any>();

  // Load MercadoPago SDK
  const sdk = useMercadopagoSDK.v2(
    process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,
    {
      locale: "es-AR",
    }
  );

  // Set preference Id when available available
  useEffect(() => {
    if (payment && payment?.method === "mercadopago") {
      const mpPayment = payment as IMercadoPagoPayment;
      if (mpPayment.link) {
        setLink(mpPayment.link);
      }
      setPreferenceId(payment?.preference_id);
    }
  }, [payment]);

  // Sets checkout object
  useEffect(() => {
    if (!checkoutObject && sdk && preferenceId) {
      const checkout = sdk?.checkout({
        preference: {
          id: preferenceId,
        },
      });

      setCheckoutObject(checkout);
    }
  }, [preferenceId, sdk, checkoutObject]);

  const createPayment = useCallback(async (): Promise<IMercadoPagoPayment> => {
    const payment: IMercadoPagoPayment = {
      method: "mercadopago",
      amount: MERCADOPAGO_AMOUNT,
      status: "waiting",
    };

    return (await createGenericPayment(payment)) as IMercadoPagoPayment;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkout = useCallback(async () => {
    if (checkoutObject) {
      checkoutObject.open();
    } else {
      console.error("Checkout object is not ready");
    }
  }, [checkoutObject]);

  const clearCheckout = useCallback(() => {
    document
      .getElementsByClassName("mp-mercadopago-checkout-wrapper")[0]
      ?.remove();

    document.getElementsByTagName("body")[0].style.overflow = "auto";
  }, []);

  return {
    payment: payment as IMercadoPagoPayment,
    sdk,
    preferenceId,
    link,
    createPayment,
    checkout,
    clearCheckout,
  };
};

export default useMercadoPago;
