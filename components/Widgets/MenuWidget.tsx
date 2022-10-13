import styled from "@emotion/styled";
import { useContext } from "react";
import { StepsContext } from "../../contexts/Steps";
import useLoading from "../../hooks/useLoading";
import useOrder from "../../hooks/useOrder";
import { MenuItems } from "../Menu/MenuItems";

import PayButton from "../Menu/PayButton";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 60vh;
  z-index: 10;
`;

export const MenuWidget = () => {
  const { setStep } = useContext(StepsContext);
  const { createOrder } = useOrder();
  const { setActive } = useLoading();

  const handlePay = () => {
    createOrder();
    setStep(1);
    setActive(true);
  };

  return (
    <Container>
      <MenuItems />
      <PayButton onClick={handlePay} />
    </Container>
  );
};
