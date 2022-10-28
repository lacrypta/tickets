import styled from "@emotion/styled";
import BackButton from "../BackButton";
import CartList from "../Order/OrderList";
import { generateCart } from "../../lib/public/utils";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ICart } from "../../types/cart";
import { useContractRead } from "wagmi";
import { CartContext } from "../../contexts/Cart";
import useOrder from "../../hooks/useOrder";
import { SettingsEthernetSharp } from "@mui/icons-material";
import { StepsContext } from "../../contexts/Steps";

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
  const { clear: clearCart } = useContext(CartContext);
  const { clear: clearOrder } = useOrder();
  const { setStep } = useContext(StepsContext);

  useEffect(() => {
    if (!order) {
      return;
    }
    clearCart();
    clearOrder();
    setStep(0);

    generateCart(order.items).then((cart) => {
      setCart(cart);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Container>
      <div>
        <h1>Pedido realizado!</h1>
      </div>

      <div>
        {order.paymentMethod === "cash"
          ? "Pagá tu orden en la caja"
          : "Retirá tu ticket por CAJA"}
      </div>
      <OrderID>Orden : #{orderId}</OrderID>
      {!cart ? (
        "Cargando..."
      ) : (
        <>
          <CartList cart={cart} />
          <div>Método: {order.paymentMethod}</div>
          <div>Total: $ {order.total}</div>
        </>
      )}

      <BackButton label={"Nueva Orden"} onClick={handleBack} />
    </Container>
  );
};
