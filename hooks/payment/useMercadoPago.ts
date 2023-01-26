import { useEffect, useState } from "react";
import { IPayment, IPaymentHook } from "./../../types/payment";
import { IMercadoPagoPayment } from "../../types/payment";
import useOrder from "../useOrder";
import { useMercadopago as useMercadopagoSDK } from "react-sdk-mercadopago";

export interface IUseOrderResult extends IPaymentHook {
  payment?: IMercadoPagoPayment;
  sdk?: any;
  preferenceId?: string;
  checkout?: () => void;
  createPayment: () => Promise<IPayment>;
}

const MERCADOPAGO_AMOUNT = 1000;

export const useMercadoPago = (): IUseOrderResult => {
  const { payment, createPayment: createGenericPayment } = useOrder();
  const [preferenceId, setPreferenceId] = useState<string>();
  const [checkoutObject, setCheckoutObject] = useState<any>();

  // Load MercadoPago SDK
  const sdk = useMercadopagoSDK.v2(
    process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,
    {
      locale: "es-AR",
    }
  );

  // Set preference Id when available
  useEffect(() => {
    setPreferenceId(payment?.preference_id);
  }, [payment]);

  // Sets checkout object
  useEffect(() => {
    if (!checkoutObject && sdk && preferenceId) {
      const checkout = sdk?.checkout({
        preference: {
          id: preferenceId,
        },
        render: {
          container: "#mercadopago-checkout",
          label: "Pagar",
        },
        onApprove: (data: any) => {
          console.log("onApprove", data);
        },
        onPayment: (data: any) => {
          console.log("onPayment", data);
        },
        onPending: (data: any) => {
          console.log("onPending", data);
        },
        onRejected: (data: any) => {
          console.log("onRejected", data);
        },
        onClose: () => {
          console.log("onClose");
        },
      });

      setCheckoutObject(checkout);
    }
  }, [preferenceId, sdk, checkoutObject]);

  let mercadoPagoPayment: IMercadoPagoPayment | undefined;

  if (payment?.method === "mercadopago") {
    mercadoPagoPayment = payment as IMercadoPagoPayment;
  } else {
    console.error("Not a MercadoPago payment");
  }

  const createPayment = async (): Promise<IMercadoPagoPayment> => {
    const payment: IMercadoPagoPayment = {
      method: "mercadopago",
      amount: MERCADOPAGO_AMOUNT,
      status: "waiting",
    };

    return (await createGenericPayment(payment)) as IMercadoPagoPayment;
  };

  const checkout = async () => {
    if (checkoutObject) {
      checkoutObject.open();
    } else {
      console.error("Checkout object is not ready");
    }
  };

  return {
    payment: mercadoPagoPayment,
    sdk,
    preferenceId,
    createPayment,
    checkout,
  };
};

export default useMercadoPago;
