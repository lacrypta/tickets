/* eslint-disable react-hooks/exhaustive-deps */

import { StepsContext } from "../../../contexts/Steps";

import React, { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useGateway from "../../../plugins/gateway/hooks/useGateway";
import useOrder from "../../../hooks/useOrder";

import PayButton from "../../Menu/PayButton";
import PaymentModal from "../../Order/PaymentModal";
import useLoading from "../../../hooks/useLoading";
import useSpendable from "../../../hooks/useSpendable";
import useUser from "../../../hooks/useUser";
import { formatUnits } from "ethers/lib/utils";

const CONTRACT_NAME =
  process.env.NEXT_PUBLIC_GATEWAY_CONTRACT_NAME || "Peronio ERC20 Gateway";
const GATEWAY_ADDRESS = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT || "3000";
const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS || "";
const PAYMENT_TTL = process.env.NEXT_PUBLIC_PAYMENT_TTL || "300";
const PERONIO_MULTIPLIER = parseFloat(process.env.PERONIO_MULTIPLIER || "0.5");

const PayWithPeronio = () => {
  const { setStep } = useContext(StepsContext);
  const { address } = useAccount();
  const { permit } = useUser();

  const { orderId, orderTotal, isPayed, payOrder } = useOrder();
  const { setActive } = useLoading();

  const { balance } = useSpendable(permit);

  const peAmount = parseFloat(orderTotal) * PERONIO_MULTIPLIER;

  useEffect(() => {
    console.info("Only once!");
    setActive(false);
  }, []);

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
    <div>
      <div>Peronio en la Wallet: {formatUnits(balance, 6)}</div>
      <div>Monto a Pagar: {peAmount}</div>
      <div>#OrderID: {orderId} P</div>

      <PayButton onClick={handlePay} />

      <PaymentModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default React.memo(PayWithPeronio);
