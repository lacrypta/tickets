import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import useOrder from "../../hooks/useOrder";
import { PaymentMethods } from "../../types/order";
import BackButton from "../BackButton";
import Button from "../common/Button";
import { Cash } from "../PaymentMethods/Cash/Cash";
import MercadoPago from "../PaymentMethods/MercadoPago/MercadoPago";

import { Peronio } from "../PaymentMethods/Peronio/Peronio";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 60vh;
  z-index: 10;
`;

const paymentMethodWidgets = {
  [PaymentMethods.MERCADOPAGO]: <MercadoPago />,
  [PaymentMethods.PERONIO]: <Peronio />,
  [PaymentMethods.CASH]: <Cash />,
};

export const PaymentMethodsWidget = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const { createOrder } = useOrder();

  const startOrder = useCallback((paymentMethod: string) => {
    createOrder(paymentMethod);
    setPaymentMethod(paymentMethod);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Button onClick={() => startOrder(PaymentMethods.MERCADOPAGO)}>
              MercadoPago
            </Button>
          </div>
          <div>
            <Button onClick={() => startOrder(PaymentMethods.PERONIO)}>
              Peronio
            </Button>
          </div>
          <div>
            <Button onClick={() => startOrder(PaymentMethods.CASH)}>
              Efectivo
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
