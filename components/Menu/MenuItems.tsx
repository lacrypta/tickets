import styled from "@emotion/styled";
import { IMenuItem } from "../../types/menu";
import { MenuItem } from "./MenuItem";

const Container = styled.div``;
interface IMenuItemsProps {
  items: IMenuItem[];
}

export const MenuItems = ({ items }: IMenuItemsProps) => {
  return (
    <Container>
      {items?.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </Container>
  );
};
