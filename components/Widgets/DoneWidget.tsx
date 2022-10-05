import styled from "@emotion/styled";
import { StepsContext } from "../../contexts/Steps";
import { useContext } from "react";
import { useAccount } from "wagmi";
import { CartContext } from "../../contexts/Cart";
import CartList from "../Order/OrderList";
import BackButton from "../BackButton";
import useOrder from "../../hooks/useOrder";
import useUser from "../../hooks/useUser";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
  font-variant-caps: petite-caps;
`;

const Account = styled.div`
  font-size: 15px;
  margin: 8px 0px;
`;

const OrderID = styled.div`
  font-size: 20px;
  margin: 8px 0px;
`;

export const DoneWidget = () => {
  const { cart, clear: clearCart } = useContext(CartContext);
  const { setStep } = useContext(StepsContext);
  const { orderId, clear: clearOrder } = useOrder();
  const { user } = useUser();

  const handleBack = () => {
    clearCart();
    clearOrder();

    setStep(0);
  };

  return (
    <Container>
      <div>
        <h1>Pedido realizado!</h1>
      </div>
      <OrderID>Orden : #{orderId}</OrderID>
      <Account>Nombre: {user?.username}</Account>
      <CartList cart={cart} />
      <BackButton onClick={handleBack} />
    </Container>
  );
};
