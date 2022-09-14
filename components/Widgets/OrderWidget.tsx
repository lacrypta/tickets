import styled from "@emotion/styled";
import { useContext } from "react";
import { CartContext } from "../../providers/Cart";
import { StepsContext } from "../../providers/Steps";
import BackButton from "../BackButton";
import CartList from "../Order/OrderList";

import PayButton from "../Menu/PayButton";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

export const CartWidget = () => {
  const { setStep } = useContext(StepsContext);
  const { cart } = useContext(CartContext);

  const handlePay = () => {
    alert("Pay");
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
    </Container>
  );
};
