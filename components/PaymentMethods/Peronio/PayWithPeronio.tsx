/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useOrder from "../../../hooks/useOrder";

import PayButton from "../../Menu/PayButton";
import PaymentModal from "./PaymentModal";
import useLoading from "../../../hooks/useLoading";
import useSpendable from "../../../hooks/useSpendable";
import useUser from "../../../hooks/useUser";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import useVoucher from "../../../plugins/gateway/hooks/useVoucher";
import { IVoucher } from "../../../plugins/gateway/types/Voucher";
import { generateMessage } from "../../../lib/public/utils";
import { Alert, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const PAYMENT_TTL = process.env.NEXT_PUBLIC_PAYMENT_TTL || "300";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
`;

const PayWithPeronio = () => {
  const { address } = useAccount();
  const { permit } = useUser();
  const { orderId, orderTotal } = useOrder();
  const { buildVoucher } = useVoucher();
  const { setActive } = useLoading();

  const { balance } = useSpendable(permit);

  const [voucher, setVoucher] = useState<IVoucher>();

  useEffect(() => {
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
      const message = generateMessage(orderId || "", orderTotal);

      const _voucher = await buildVoucher({
        from: address || "",
        amount: parseUnits(String(orderTotal), 6),
        validUntil: Math.floor(Date.now() / 1000) + parseInt(PAYMENT_TTL),
        message,
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

  const enoughFunds =
    parseFloat(formatUnits(balance, 6)) >= parseFloat(orderTotal);

  console.info("enoughFunds", enoughFunds);
  console.info("formatUnits(balance, 6)", formatUnits(balance, 6));
  console.info("orderTotal", orderTotal);
  return (
    <div>
      <div>Peronio en la Wallet: {formatUnits(balance, 6)}</div>
      <div>Monto a Pagar: {orderTotal} P</div>

      {!orderId ? (
        <Centered>
          <CircularProgress />
          <div>Cargando Orden...</div>
        </Centered>
      ) : (
        <div>#OrderID: {orderId}</div>
      )}
      {!enoughFunds ? (
        <Alert severity='error'>
          No tenes Peronios suficientes. Tenes que comprarselos al arbolito de
          La Crypta.
        </Alert>
      ) : (
        ""
      )}
      <PayButton disabled={!orderId || !enoughFunds} onClick={handlePay} />

      <PaymentModal voucher={voucher} open={open} setOpen={setOpen} />
    </div>
  );
};

export default React.memo(PayWithPeronio);
