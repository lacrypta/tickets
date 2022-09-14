import styled from "@emotion/styled";
import { useContext } from "react";
import { CartContext } from "../../providers/Cart";
import { StepsContext } from "../../providers/Steps";

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
    setStep(2);
  };

  return (
    <Container>
      <div>
        <h1>Cart</h1>
      </div>
      <div>{JSON.stringify(cart)}</div>
      <PayButton onClick={handlePay} />
    </Container>
  );
};
