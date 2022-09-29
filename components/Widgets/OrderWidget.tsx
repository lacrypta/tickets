import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/Cart";
import { StepsContext } from "../../contexts/Steps";
import BackButton from "../BackButton";
import CartList from "../Order/OrderList";

import PayButton from "../Menu/PayButton";
import PaymentModal from "../Order/PaymentModal";
import useGateway from "../../hooks/useGateway";
import { useAccount } from "wagmi";
import { parseUnits } from "ethers/lib/utils";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  z-index: 10;
`;

const gatewayAddress = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT || "3000";
const paymentTTL = process.env.NEXT_PUBLIC_PAYMENT_TTL || "300";

export const CartWidget = () => {
  const { setStep } = useContext(StepsContext);
  const { cart } = useContext(CartContext);
  const { address } = useAccount();

  const [open, setOpen] = useState(false);

  const { requestSignature } = useGateway();

  const handlePay = () => {
    setOpen(true);
    requestSignature({
      contract: gatewayAddress,
      name: "Peronio Gateway",
      spender: address || "",
      value: parseUnits(String(cart.total), 6).toString(),
      deadline: Math.floor(Date.now() / 1000) + parseInt(paymentTTL),
      fee: 100,
    });
    // setStep(2);
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <Container>
      <div>
        <h1>La Cuenta</h1>
      </div>

      <CartList cart={cart} />
      <BackButton onClick={handleBack} />
      <PayButton onClick={handlePay} />

      <PaymentModal open={open} setOpen={setOpen} />
    </Container>
  );
};
