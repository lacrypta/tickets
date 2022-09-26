import styled from "@emotion/styled";
import { useContext } from "react";
import { StepsContext } from "../../contexts/Steps";
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

  const handlePay = () => {
    setStep(1);
  };

  return (
    <Container>
      <MenuItems />
      <PayButton onClick={handlePay} />
    </Container>
  );
};
