import styled from "@emotion/styled";
import { MenuItems } from "./MenuItems";

import PayButton from "./PayButton";
import { useContext } from "react";
import { CartContext } from "../../providers/cart";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

export const MenuWidget = () => {
  const { menuItems } = useContext(CartContext);

  console.info("Menu Items!");
  console.dir(menuItems);
  return (
    <Container>
      <MenuItems items={menuItems} />
      <PayButton />
    </Container>
  );
};
