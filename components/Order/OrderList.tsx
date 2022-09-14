import styled from "@emotion/styled";
import { ICart } from "../../types/cart";

const Container = styled.div`
  width: 100%;
  border: 1px solid white;
  padding: 10px;
`;

const ItemList = styled.div`
  border-bottom: 1px solid white;
  margin: 0px 0px 10px 0px;
  padding-bottom: 10px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemName = styled.div`
  flex-grow: 12;
`;

const ItemQty = styled.div`
  flex-grow: 1;
`;

const ItemPrice = styled.div`
  flex-grow: 2;
`;

const ItemSum = styled.div`
  text-align: right;
  flex-grow: 2;
`;

const Summary = styled.div``;

interface ICartListProps {
  cart: ICart;
}

const CartList = ({ cart }: ICartListProps) => {
  const cartItems = Object.values(cart.items).filter((item) => item.qty > 0);
  return (
    <Container>
      <ItemList>
        {cartItems.map((item) => (
          <Item key={item.product.id}>
            <ItemQty>{item.qty} x</ItemQty>
            <ItemName>{item.product.name}</ItemName>
            <ItemPrice>$ {item.product.price}</ItemPrice>
            <ItemSum>$ {item.product.price * item.qty}</ItemSum>
          </Item>
        ))}
      </ItemList>
      <Summary>
        <ItemSum>$ {cart.total}</ItemSum>
      </Summary>
    </Container>
  );
};

export default CartList;
