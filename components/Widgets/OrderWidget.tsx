import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/Cart";
import { StepsContext } from "../../contexts/Steps";
import BackButton from "../BackButton";
import CartList from "../Order/OrderList";

import PayButton from "../Menu/PayButton";
import PaymentModal from "../Order/PaymentModal";
import useOrder from "../../hooks/useOrder";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

const OrderID = styled.div`
  margin: 10px 0px 10px 0px;
`;

export const OrderWidget = () => {
  const { setStep } = useContext(StepsContext);
  const { cart } = useContext(CartContext);
  const { isLoading, orderId } = useOrder();

  const [open, setOpen] = useState(false);

  const handlePay = () => {
    setOpen(true);
    // setStep(2);
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <Container>
      <div>
        <h1>La Cuenta</h1>

        <OrderID>
          {isLoading ? "(Generando Order...)" : "Orden #" + orderId}
        </OrderID>
      </div>

      <CartList cart={cart} />
      <BackButton onClick={handleBack} />

      <PayButton onClick={handlePay} />

      <PaymentModal open={open} setOpen={setOpen} />
    </Container>
  );
};
