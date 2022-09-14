import styled from "@emotion/styled";
import { useContext } from "react";
import { CartContext } from "../../providers/Cart";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

export const DoneWidget = () => {
  const { cart } = useContext(CartContext);

  return (
    <Container>
      <div>
        <h1>Congratulations</h1>
      </div>
      <div>{JSON.stringify(cart)}</div>
    </Container>
  );
};
