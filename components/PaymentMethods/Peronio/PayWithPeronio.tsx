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
import { formatUnits, parseUnits } from "ethers/lib/utils";
import useVoucher from "../../../plugins/gateway/hooks/useVoucher";

// const CONTRACT_NAME =
process.env.NEXT_PUBLIC_GATEWAY_CONTRACT_NAME || "Peronio ERC20 Gateway";
// const GATEWAY_ADDRESS = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT || "3000";
const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS || "";
const PAYMENT_TTL = process.env.NEXT_PUBLIC_PAYMENT_TTL || "300";
const PERONIO_MULTIPLIER = parseFloat(process.env.PERONIO_MULTIPLIER || "0.5");

const PayWithPeronio = () => {
  const { setStep } = useContext(StepsContext);
  const { address } = useAccount();
  const { permit } = useUser();

  const { orderId, orderTotal, isPayed, payOrder } = useOrder();
  const { setActive } = useLoading();
  const { buildVoucher } = useVoucher();

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
    // requestSignature,
  } = useGateway();

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

  const handlePay = async () => {
    setOpen(true);

    console.info();
    const voucher = await buildVoucher({
      from: address || "",
      to: BAR_ADDRESS,
      amount: parseUnits(String(peAmount), 6),
      deadline: Math.floor(Date.now() / 1000) + parseInt(PAYMENT_TTL),
      orderId: orderId || "",
    });

    console.dir(voucher);
    // requestSignature(voucher);
  };

  return (
    <div>
      <div>Peronio en la Wallet: {formatUnits(balance, 6)}</div>
      <div>Monto a Pagar: {peAmount} P</div>
      <div>#OrderID: {orderId}</div>

      <PayButton onClick={handlePay} />

      <PaymentModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default React.memo(PayWithPeronio);
