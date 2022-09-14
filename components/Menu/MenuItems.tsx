import styled from "@emotion/styled";
import { useContext } from "react";
import { CartContext } from "../../providers/cart";
import { ICartItem } from "../../types/cart";
import { MenuItem } from "./MenuItem";

const Container = styled.div``;

export const MenuItems = () => {
  const { cart } = useContext(CartContext);
  console.info("Update Cart:");
  console.dir(cart);
  const cartItems = cart ? Object.values(cart) : [];
  return (
    <Container>
      {cartItems.map((cartItem: ICartItem) => (
        <MenuItem
          key={cartItem.item.id}
          item={cartItem.item}
          qty={cartItem.qty}
        />
      ))}
    </Container>
  );
};
