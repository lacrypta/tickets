import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { IMenuItem } from "../../types/menu";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ItemPrice from "./ItemPrice";

const Container = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  &:hover {
    background: #1b1b1b;
  }
`;

interface IMenuItemProps {
  item: IMenuItem;
  qty: number;
}

export const MenuItem = ({ item, qty }: IMenuItemProps) => {
  const handleAdd = () => {
    console.info("Added!", item.id);
  };

  return (
    <Container>
      <div>
        <div>{item.name}</div>
        <ItemPrice price={item.price} qty={qty} />
      </div>
      <IconButton
        edge='end'
        aria-label='add'
        color='secondary'
        onClick={handleAdd}
      >
        <AddCircleIcon />
      </IconButton>
    </Container>
  );
};
