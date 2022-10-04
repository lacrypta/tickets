import styled from "@emotion/styled";

import { CartContext } from "../../contexts/Cart";
import { StepsContext } from "../../contexts/Steps";

import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useGateway from "../../hooks/useGateway";
import useOrder from "../../hooks/useOrder";

import BackButton from "../BackButton";
import CartList from "../Order/OrderList";

import PayButton from "../Menu/PayButton";
import PaymentModal from "../Order/PaymentModal";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

const CONTRACT_NAME = "Peronio Gateway";
const GATEWAY_ADDRESS = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT || "3000";
const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS || "";
const PAYMENT_TTL = process.env.NEXT_PUBLIC_PAYMENT_TTL || "300";

const OrderID = styled.div`
  margin: 10px 0px 10px 0px;
`;

export const OrderWidget = () => {
  const { setStep } = useContext(StepsContext);
  const { cart } = useContext(CartContext);
  const { address } = useAccount();
  const { isLoading, orderId, orderTotal, payOrder } = useOrder();

  const {
    voucher,
    signature,
    isLoading: isSignatureLoading,
    isSuccess: isSignatureSuccess,
    requestSignature,
  } = useGateway(CONTRACT_NAME, GATEWAY_ADDRESS);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isSignatureLoading && isSignatureSuccess && signature) {
      payOrder({
        voucher,
        signature,
      });
    }
    // setStep(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, isSignatureSuccess, isSignatureLoading]);

  const handlePay = () => {
    setOpen(true);
    requestSignature({
      from: address || "",
      to: BAR_ADDRESS,
      amount: orderTotal,
      deadline: Math.floor(Date.now() / 1000) + parseInt(PAYMENT_TTL),
      orderId: orderId || "",
    });
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <Container>
      <div>
        <h1>La Cuenta</h1>

        <OrderID>
          {isLoading ? "(Generando Orden...)" : "Orden #" + orderId}
        </OrderID>
      </div>

      <CartList cart={cart} />
      <BackButton onClick={handleBack} />

      <PayButton onClick={handlePay} />

      <PaymentModal open={open} setOpen={setOpen} />
    </Container>
  );
};
