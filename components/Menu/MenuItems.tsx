import styled from "@emotion/styled";
import { useContext } from "react";
import { CartContext } from "../../providers/Cart";
import { ICartItem } from "../../types/cart";
import { MenuItem } from "./MenuItem";

const Container = styled.div``;

export const MenuItems = () => {
  const { cart } = useContext(CartContext);
  const cartItems = cart?.items ? Object.values(cart.items) : [];
  return (
    <Container>
      {cartItems.map((cartItem: ICartItem) => (
        <MenuItem
          key={cartItem.product.id}
          item={cartItem.product}
          qty={cartItem.qty}
        />
      ))}
    </Container>
  );
};
