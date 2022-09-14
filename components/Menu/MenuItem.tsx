import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { IMenuItem } from "../../types/menu";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import ItemPrice from "./ItemPrice";

const Container = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  transition: background 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

interface IMenuItemProps {
  item: IMenuItem;
  qty: number;
}

const ZoomButton = styled(IconButton)`
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.5);
  }
`;

export const MenuItem = ({ item, qty }: IMenuItemProps) => {
  const handleAdd = () => {
    console.info("Added!", item.id);
  };

  const handleRemove = () => {
    console.info("Added!", item.id);
  };

  return (
    <Container>
      <div>
        <div>{item.name}</div>
        <ItemPrice price={item.price} qty={qty} />
      </div>
      <div>
        {qty > 0 ? (
          <ZoomButton
            edge='end'
            aria-label='remove'
            color='primary'
            onClick={handleRemove}
          >
            <RemoveCircleIcon />
          </ZoomButton>
        ) : (
          ""
        )}

        <ZoomButton
          edge='end'
          aria-label='add'
          color='secondary'
          onClick={handleAdd}
        >
          <AddCircleIcon />
        </ZoomButton>
      </div>
    </Container>
  );
};
