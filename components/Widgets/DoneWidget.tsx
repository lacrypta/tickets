import styled from "@emotion/styled";
import { StepsContext } from "../../providers/Steps";
import { useContext } from "react";
import { useAccount } from "wagmi";
import { CartContext } from "../../providers/Cart";
import CartList from "../Order/OrderList";
import BackButton from "../BackButton";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

const Account = styled.div`
  font-size: 15px;
  margin: 8px 0px;
`;

export const DoneWidget = () => {
  const { cart, clear } = useContext(CartContext);
  const { setStep } = useContext(StepsContext);
  const { address } = useAccount();

  const handleBack = () => {
    clear();
    setStep(0);
  };

  return (
    <Container>
      <div>
        <h1>Pedido realizado</h1>
      </div>
      <Account>Nombre: {address}</Account>
      <CartList cart={cart} />
      <BackButton onClick={handleBack} />
    </Container>
  );
};
