import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useMercadopago } from "react-sdk-mercadopago";
import useOrder from "../../hooks/useOrder";
import {
  ICreatePaymentRequestBody,
  ResponseDataType,
} from "../../types/request";
import useLoading from "../../hooks/useLoading";
import { Button } from "@mui/material";
import LargeButton from "../common/LargeButton";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

const requestPreference = async (
  data: ICreatePaymentRequestBody
): Promise<ResponseDataType> => {
  const res = await fetch("/api/gateway/mercadopago/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const MercadoPago = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setActive } = useLoading();
  const [isPreferenceLoading, setIsPreferenceLoading] =
    useState<boolean>(false);
  const [preferenceId, setPreferenceId] = useState<string>();
  const [checkoutObject, setCheckoutObject] = useState<any>();
  const { orderId, isLoading: isOrderLoading } = useOrder();

  const mercadopago = useMercadopago.v2(
    process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN || "",
    {
      locale: "es-AR",
    }
  );

  const openCheckout = () => {
    checkoutObject.open();
  };

  // Start loading
  useEffect(() => {
    setActive(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Requests for a preferenceID once orderID is available
  useEffect(() => {
    if (!orderId) {
      return;
    }
    setIsPreferenceLoading(true);
    requestPreference({ orderId }).then((res) => {
      setIsPreferenceLoading(false);
      if (!res.success) {
        alert("Hubo un error");
        setActive(false);
        console.dir(res);
        return;
      }
      setPreferenceId(res.data.preferenceId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // MercadoPago Checkout Pro
  useEffect(() => {
    if (orderId && preferenceId && mercadopago && !mounted) {
      setMounted(true);

      const checkout = mercadopago.checkout({
        preference: {
          id: preferenceId,
        },
      });

      setCheckoutObject(checkout);
      setActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, preferenceId, mercadopago, mounted]);

  return (
    <Container>
      <h1>MercadoPago</h1>
      {isOrderLoading ? <div>Cargando Orden....</div> : ""}
      {isPreferenceLoading ? <div>Generando ID desde MercadoPago....</div> : ""}
      <div>
        <LargeButton disabled={!checkoutObject} onClick={openCheckout}>
          PAGAR con MercadoPago
        </LargeButton>
      </div>
    </Container>
  );
};
