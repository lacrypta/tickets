import styled from "@emotion/styled";
import { MenuItems } from "./MenuItems";

import { IMenuItem } from "../../types/menu";
import PayButton from "./PayButton";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
`;

interface IMenuWidgetProps {
  menuItems: IMenuItem[];
}

export const MenuWidget = ({ menuItems }: IMenuWidgetProps) => {
  return (
    <Container>
      <MenuItems items={menuItems} />
      <PayButton />
    </Container>
  );
};