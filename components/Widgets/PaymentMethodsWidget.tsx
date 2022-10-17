import styled from "@emotion/styled";
import { useState } from "react";
import { PaymentMethods } from "../../types/cart";
import BackButton from "../BackButton";
import Button from "../common/Button";

import { Peronio } from "../PaymentMethods/Peronio/Peronio";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 60vh;
  z-index: 10;
`;

const paymentMethodWidgets = {
  [PaymentMethods.MERCADOPAGO]: "MercadoPago Bitch",
  [PaymentMethods.PERONIO]: <Peronio />,
};

export const PaymentMethodsWidget = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>();

  const handleBack = () => {
    setPaymentMethod(undefined);
  };

  return (
    <Container>
      <div>
        <h1>Momento de Pagar</h1>
      </div>
      {!paymentMethod ? (
        <div>
          <div>
            <Button
              onClick={() => setPaymentMethod(PaymentMethods.MERCADOPAGO)}
            >
              MercadoPago
            </Button>
          </div>
          <div>
            <Button onClick={() => setPaymentMethod(PaymentMethods.PERONIO)}>
              Peronio
            </Button>
          </div>
        </div>
      ) : (
        <>
          {paymentMethodWidgets[paymentMethod]}
          <BackButton onClick={handleBack} />
        </>
      )}
    </Container>
  );
};
