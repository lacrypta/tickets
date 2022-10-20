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
import {
  ITransferVoucher,
  ITransferVoucherSigned,
} from "../../../plugins/gateway/types/Voucher";
import { RestaurantRounded } from "@mui/icons-material";

// const CONTRACT_NAME =
process.env.NEXT_PUBLIC_GATEWAY_CONTRACT_NAME || "Peronio ERC20 Gateway";
// const GATEWAY_ADDRESS = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT || "3000";
const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS || "";
const PAYMENT_TTL = process.env.NEXT_PUBLIC_PAYMENT_TTL || "300";
const PERONIO_MULTIPLIER = parseFloat(process.env.PERONIO_MULTIPLIER || "0.5");

const PayWithPeronio = () => {
  const { address } = useAccount();
  const { permit } = useUser();

  const { orderId, orderTotal, isPayed, payOrder } = useOrder();
  const { setActive } = useLoading();

  const [voucher, setVoucher] = useState<ITransferVoucher>();

  const { buildVoucher } = useVoucher();

  const { balance } = useSpendable(permit);

  const peAmount = parseFloat(orderTotal) * PERONIO_MULTIPLIER;

  useEffect(() => {
    console.info("Only once!");
    setActive(false);
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (orderId) {
      setActive(false);
    }
  }, [orderId]);

  const handlePay = async () => {
    setOpen(true);
    setVoucher(undefined);

    // Start Loading
    setActive(true);

    try {
      const _voucher = await buildVoucher({
        from: address || "",
        to: BAR_ADDRESS,
        amount: parseUnits(String(peAmount), 6),
        deadline: Math.floor(Date.now() / 1000) + parseInt(PAYMENT_TTL),
        orderId: orderId || "",
      });

      if (!_voucher) {
        setOpen(false);
        throw new Error("No se pudo generar el voucher con el call");
      }

      setVoucher(_voucher);
    } catch (e: any) {
      alert(e.message);
    }

    // Stop Loading
    setActive(false);
  };

  return (
    <div>
      <div>Peronio en la Wallet: {formatUnits(balance, 6)}</div>
      <div>Monto a Pagar: {peAmount} P</div>
      <div>#OrderID: {orderId}</div>

      <PayButton onClick={handlePay} />

      <PaymentModal voucher={voucher} open={open} setOpen={setOpen} />
    </div>
  );
};

export default React.memo(PayWithPeronio);
