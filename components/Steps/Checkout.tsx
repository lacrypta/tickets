import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState } from "react";
import { MercadoPago } from "../PaymentMethods/MercadoPago";
import { InvitationCode } from "../PaymentMethods/InvitationCode";
import { Crypto } from "../PaymentMethods/Crypto";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
  padding: 1em;
  background: #888888;
  border-radius: 5px;
`;

const MethodDiv = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

const paymentMethods: { [_key: string]: any } = {
  mercadoPago: <MercadoPago />,
  crypto: <Crypto />,
  invitationCode: <InvitationCode />,
};

export const Checkout = () => {
  const [method, setMethod] = useState<string>();

  return (
    <Container>
      <h1>Elegí el medio de pago</h1>

      <div>Sale $5000</div>

      {!method ? (
        <>
          <MethodDiv>
            <Button onClick={() => setMethod("mercadoPago")}>
              MercadoPago
            </Button>
          </MethodDiv>
          <MethodDiv>
            <Button onClick={() => setMethod("crypto")}>Crypto</Button>
          </MethodDiv>
          <MethodDiv>
            <Button onClick={() => setMethod("invitationCode")}>Código</Button>
          </MethodDiv>
        </>
      ) : (
        paymentMethods[method]
      )}
    </Container>
  );
};
