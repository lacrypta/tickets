import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MercadoPago } from "../PaymentMethods/MercadoPago";
import { InvitationCode } from "../PaymentMethods/InvitationCode";
import { Crypto } from "../PaymentMethods/Crypto";
import useOrder from "../../hooks/useOrder";
// import { ICreateOrderRequestBody } from "../../types/request";
import { PaymentMethod } from "../../types/order";

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

const MethodButton = styled(Button)`
  width: 100%;
  font-size: 20px;
`;

const TICKET_PRICE = process.env.NEXT_PUBLIC_TICKET_PRICE || "2000";

const paymentMethods: { [_key: string]: any } = {
  mercadopago: <MercadoPago />,
  crypto: <Crypto />,
  invitation: <InvitationCode />,
};

export const Checkout = () => {
  const [method, setMethod] = useState<PaymentMethod>();
  const { orderId, createOrder, fullname, email } = useOrder();

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
      <h1>Elegí el medio de pago</h1>

      <PriceDiv>Precio de la Entrada ${TICKET_PRICE}</PriceDiv>

      {!method ? (
        <MethodList>
          <MethodDiv>
            <MethodButton onClick={() => setMethod("mercadopago")}>
              MercadoPago
            </MethodButton>
          </MethodDiv>
          <MethodDiv>
            <MethodButton onClick={() => setMethod("crypto")}>
              Crypto
            </MethodButton>
          </MethodDiv>
          <MethodDiv>
            <MethodButton onClick={() => setMethod("invitation")}>
              Código
            </MethodButton>
          </MethodDiv>
        </MethodList>
      ) : (
        paymentMethods[method]
      )}
    </Container>
  );
};
