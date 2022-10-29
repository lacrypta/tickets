import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MercadoPago } from "../PaymentMethods/MercadoPago";
import { InvitationCode } from "../PaymentMethods/InvitationCode";
import { Crypto } from "../PaymentMethods/Crypto";
import useOrder from "../../hooks/useOrder";
// import { ICreateOrderRequestBody } from "../../types/request";
import { PaymentMethod } from "../../types/order";
import LargeButton from "../common/LargeButton";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
  padding: 1em;
  background: rgba(80, 80, 80, 0.3);
  border-radius: 5px;
  backdrop-filter: blur(4px);
`;

const PriceDiv = styled.div`
  font-size: 25px;
`;

const MethodList = styled.div`
  width: 100%;
  margin-top: 1em;
`;

const MethodDiv = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

const TICKET_PRICE = process.env.NEXT_PUBLIC_TICKET_PRICE || "2000";

const paymentMethods: { [_key: string]: any } = {
  mercadopago: <MercadoPago />,
  crypto: <Crypto />,
  invitation: <InvitationCode />,
};

export const Checkout = () => {
  const [method, setMethod] = useState<PaymentMethod>();
  const { orderId, createOrder, fullname, email, clear } = useOrder();
  const router = useRouter();

  useEffect(() => {
    switch (router.asPath) {
      case "/#payment":
        clear();
        setMethod(undefined);
        break;
      case "/#payment/crypto":
        setMethod("crypto");
        break;
      case "/#payment/mercadopago":
        setMethod("mercadopago");
        break;
      case "/#payment/invitation":
        setMethod("invitation");
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (method) {
      router.push(`/#payment/${method}`, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  useEffect(() => {
    if (orderId || !method) {
      return;
    }
    createOrder({
      fullname,
      email,
      paymentMethod: method,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, method]);

  return (
    <Container>
      <h1>Medio de Pago</h1>

      <PriceDiv>Precio de la Entrada ${TICKET_PRICE}</PriceDiv>

      <Alert severity='warning'>
        Entradas agotadas para la venta. Sólo con invitación.
      </Alert>

      {!method ? (
        <MethodList>
          <MethodDiv>
            <LargeButton
              disabled={true}
              onClick={() => setMethod("mercadopago")}
            >
              MercadoPago
            </LargeButton>
          </MethodDiv>
          <MethodDiv>
            <LargeButton disabled={true} onClick={() => setMethod("crypto")}>
              Crypto
            </LargeButton>
          </MethodDiv>
          <MethodDiv>
            <LargeButton onClick={() => setMethod("invitation")}>
              Código
            </LargeButton>
          </MethodDiv>
        </MethodList>
      ) : (
        paymentMethods[method]
      )}
    </Container>
  );
};
