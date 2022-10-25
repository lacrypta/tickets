import styled from "@emotion/styled";
import BackButton from "../BackButton";
import CartList from "../Order/OrderList";
import { generateCart } from "../../lib/public/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICart } from "../../types/cart";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 50vh;
  z-index: 10;
  font-variant-caps: petite-caps;
`;

const OrderID = styled.div`
  font-size: 20px;
  margin: 8px 0px;
`;

interface IDoneProps {
  orderId: number;
  order: any;
}

export const DoneWidget = ({ orderId, order }: IDoneProps) => {
  const router = useRouter();
  const [cart, setCart] = useState<ICart>();

  useEffect(() => {
    if (!order) {
      return;
    }
    generateCart(order.items).then((cart) => {
      setCart(cart);
    });
  }, [order]);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Container>
      <div>
        <h1>Pedido realizado!</h1>
      </div>
      <div>Retirá tu ticket por CAJA</div>
      <OrderID>Orden : #{orderId}</OrderID>
      {!cart ? (
        "Cargando..."
      ) : (
        <>
          <CartList cart={cart} />
          <div>Método: {order.payment_method}</div>
          <div>Cart total: $ {cart.total}</div>
          <div>Pagado: $ {order.total}</div>
        </>
      )}

      <BackButton label={"Nueva Orden"} onClick={handleBack} />
    </Container>
  );
};
