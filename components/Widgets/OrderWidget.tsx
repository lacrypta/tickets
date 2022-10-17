import styled from "@emotion/styled";

import { CartContext } from "../../contexts/Cart";
import { StepsContext } from "../../contexts/Steps";

import { useContext, useState } from "react";

import BackButton from "../BackButton";
import CartList from "../Order/OrderList";

import PayButton from "../Menu/PayButton";
import PaymentModal from "../Order/PaymentModal";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

export const OrderWidget = () => {
  const { setStep } = useContext(StepsContext);
  const { cart } = useContext(CartContext);

  const [open, setOpen] = useState(false);

  const handlePay = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <Container>
      <div>
        <h1>La Cuenta</h1>
      </div>

      <CartList cart={cart} />
      <BackButton onClick={handleBack} />

      <PayButton onClick={handlePay} />

      <PaymentModal open={open} setOpen={setOpen} />
    </Container>
  );
};
