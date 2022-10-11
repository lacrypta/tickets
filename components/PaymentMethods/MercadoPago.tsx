import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useMercadopago } from "react-sdk-mercadopago";
import useOrder from "../../hooks/useOrder";
import {
  ICreatePaymentRequestBody,
  ResponseDataType,
} from "../../types/request";

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
  const [isPreferenceLoading, setIsPreferenceLoading] =
    useState<boolean>(false);
  const [preferenceId, setPreferenceId] = useState<string>();
  const { orderId, isLoading: isOrderLoading } = useOrder();

  const mercadopago = useMercadopago.v2(
    process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN || "",
    {
      locale: "es-AR",
    }
  );

  // Requests for a preferenceID once orderID is available
  useEffect(() => {
    if (!orderId) {
      return;
    }

    setIsPreferenceLoading(true);
    requestPreference({ orderId }).then((res) => {
      if (!res.success) {
        alert("Hubo un error");
        console.dir(res);
        return;
      }
      setPreferenceId(res.data.preferenceId);
      setIsPreferenceLoading(false);
    });
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

      checkout.render({
        container: "#mercadopago-container",
        label: "Pagar",
      });
    }
  }, [orderId, preferenceId, mercadopago, mounted]);

  return (
    <Container>
      <h1>MercadoPago</h1>
      {isOrderLoading ? <div>Cargando Orden....</div> : ""}
      {isPreferenceLoading ? <div>Generando ID desde MercadoPago....</div> : ""}
      <div id='mercadopago-container' />
    </Container>
  );
};
