import styled from "@emotion/styled";
import { MenuItems } from "./MenuItems";

import PayButton from "./PayButton";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

export const MenuWidget = () => {
  return (
    <Container>
      <MenuItems />
      <PayButton />
    </Container>
  );
};
