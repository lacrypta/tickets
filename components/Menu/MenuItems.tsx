import styled from "@emotion/styled";
import { useContext } from "react";
import { CartContext } from "../../contexts/Cart";
import { categories } from "../../lib/public/menu";
import { ICartItem } from "../../types/cart";
import { MenuItem } from "./MenuItem";

const Container = styled.div``;

const CategoryDiv = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 30px 0px 10px 0px;
`;

export const MenuItems = () => {
  const { cart } = useContext(CartContext);
  const cartItems = cart.items ? Object.values(cart.items) : [];

  return (
    <Container>
      {categories.map((category, k) => (
        <div key={k}>
          <CategoryDiv>{category.name}</CategoryDiv>
          {cartItems
            .filter((item) => item.product.cat === category.id)
            .map((cartItem: ICartItem) => (
              <MenuItem
                key={cartItem.product.id}
                item={cartItem.product}
                qty={cartItem.qty}
              />
            ))}
        </div>
      ))}
    </Container>
  );
};
