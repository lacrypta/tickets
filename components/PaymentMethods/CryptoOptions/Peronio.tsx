import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  ICreateCryptoPaymentRequestBody,
  ResponseDataType,
} from "../../../types/request";
import { parseUnits } from "ethers/lib/utils";
import IERC20ABI from "../../../abi/IERC20.json";

import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { useRouter } from "next/router";

import useOrder from "../../../hooks/useOrder";
import useLoading from "../../../hooks/useLoading";
import LargeButton from "../../common/LargeButton";
import PeronioIcon from "../../common/PeronioIcon";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

const PriceDiv = styled.div`
  margin: 10px 0px 10px;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 30px;
  justify-content: center;

  b {
    margin-right: 10px;
  }

  span {
    margin-left: 5px;
  }
`;

const TICKET_PRICE = parseFloat(
  process.env.NEXT_PUBLIC_TICKET_PRICE_PE || "1000"
);
const PERONIO_ADDRESS = process.env.NEXT_PUBLIC_PERONIO_ADDRESS || "";
const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS || "";

const claimApprove = async (
  data: ICreateCryptoPaymentRequestBody
): Promise<ResponseDataType> => {
  console.info("Claiming Approve");
  console.dir(data);
  const res = await fetch("/api/gateway/crypto/approve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

const Peronio = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { orderId } = useOrder();

  const peAmount = parseUnits(TICKET_PRICE.toString(), 6);

  const { config } = usePrepareContractWrite({
    addressOrName: PERONIO_ADDRESS,
    contractInterface: IERC20ABI,
    functionName: "transfer",
    args: [BAR_ADDRESS, peAmount],
  });
  const { data, isLoading, write } = useContractWrite(config);
  const { setActive } = useLoading();

  const handleTxPayed = (tx: any) => {
    setActive(true);
    claimApprove({
      orderId: orderId || "",
      address: address || "",
      amount: peAmount.toString(),
      tx: tx.transactionHash,
    }).then((res) => {
      if (!res.success) {
        setActive(false);
        return;
      }
      router.push("/entrada/" + orderId);
    });
  };

  const handlePay = async () => {
    if (!write) {
      return;
    }
    console.info("Starting payment!");
    write();
  };

  // Listen for Transfer Event
  useContractEvent({
    addressOrName: PERONIO_ADDRESS,
    contractInterface: IERC20ABI,
    eventName: "Transfer",
    listener(data) {
      const [from, to, value, tx] = data;

      if (to !== BAR_ADDRESS || address !== from) {
        return;
      }

      if (!value.eq(parseUnits(String(TICKET_PRICE), 6))) {
        console.error("Invalid Amount!");
        return;
      }

      console.info("Handle Tx!");
      handleTxPayed(tx);
    },
  });

  // Sync loading provider with local one
  useEffect(() => {
    setActive(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Container>
      <PriceDiv>
        <b>Precio: </b> <PeronioIcon />
        <span>{TICKET_PRICE.toFixed(2)}</span>
      </PriceDiv>

      {data?.hash ? (
        <>
          <div>Esperando confirmación de transacción...</div>
          <div>No recargues ni salgas de la página.</div>
          <div>
            <a
              target='_blank'
              rel='noreferrer'
              href={"https://polygonscan.com/tx/" + data?.hash}
            >
              Ver en PolygonScan
            </a>
          </div>
        </>
      ) : (
        <>
          {isLoading ? (
            "Cargando..."
          ) : (
            <LargeButton disabled={!orderId} onClick={handlePay}>
              PAGAR
            </LargeButton>
          )}
        </>
      )}
    </Container>
  );
};

export default Peronio;
