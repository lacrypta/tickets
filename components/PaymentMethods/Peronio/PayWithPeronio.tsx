/* eslint-disable react-hooks/exhaustive-deps */

import { StepsContext } from "../../../contexts/Steps";

import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useGateway from "../../../hooks/useGateway";
import useOrder from "../../../hooks/useOrder";

import PayButton from "../../Menu/PayButton";
import PaymentModal from "../../Order/PaymentModal";
import useLoading from "../../../hooks/useLoading";

const CONTRACT_NAME =
  process.env.NEXT_PUBLIC_GATEWAY_CONTRACT_NAME || "Peronio ERC20 Gateway";
const GATEWAY_ADDRESS = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT || "3000";
const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS || "";
const PAYMENT_TTL = process.env.NEXT_PUBLIC_PAYMENT_TTL || "300";

export const PayWithPeronio = () => {
  const { setStep } = useContext(StepsContext);
  const { address } = useAccount();
  const { orderId, orderTotal, isPayed, payOrder } = useOrder();
  const { setActive } = useLoading();

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
  }, [signature, isSignatureSuccess, isSignatureLoading]);

  useEffect(() => {
    if (isPayed) {
      setStep(3);
    }
  }, [isPayed]);

  useEffect(() => {
    if (orderId) {
      setActive(false);
    }
  }, [orderId]);

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

  return (
    <>
      <PayButton onClick={handlePay} />
      <PaymentModal open={open} setOpen={setOpen} />
    </>
  );
};
