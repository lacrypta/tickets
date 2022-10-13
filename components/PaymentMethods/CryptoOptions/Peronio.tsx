import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseUnits } from "ethers/lib/utils";

import {
  ICreateCryptoPaymentRequestBody,
  ResponseDataType,
} from "../../../types/request";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

import ERC20ABI from "../../../abi/IERC20.json";
import useOrder from "../../../hooks/useOrder";
import { useRouter } from "next/router";

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
  const { address } = useAccount();
  const { orderId } = useOrder();
  const peAmount = parseUnits(TICKET_PRICE.toString(), 6);
  const router = useRouter();

  const [isTxLoading, setIsTxLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false); // Tx

  const { config } = usePrepareContractWrite({
    addressOrName: PERONIO_ADDRESS,
    contractInterface: ERC20ABI,
    functionName: "transfer",
    args: [BAR_ADDRESS, peAmount],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handlePay = async () => {
    if (!write) {
      return;
    }
    console.info("Starting payment!");
    write();
  };

  useEffect(() => {
    if (isTxLoading || !isSuccess || !orderId || !address || !data) {
      return;
    }
    setIsTxLoading(true);

    data.wait().then((tx) => {
      if (isListening) {
        return;
      }
      setIsListening(true);
      claimApprove({
        orderId,
        address,
        amount: peAmount.toString(),
        tx: tx.transactionHash,
      }).then((res) => {
        if (!res.success) {
          setIsListening(false);
          setIsTxLoading(false);
          return;
        }

        router.push("/entrada/" + orderId);
      });
    });
  }, [
    address,
    data,
    isListening,
    isSuccess,
    orderId,
    peAmount,
    router,
    isTxLoading,
  ]);

  return (
    <Container>
      <h3>Peronio</h3>
      <div>Precio en PE: {TICKET_PRICE.toFixed(2)}</div>
      {isTxLoading ? (
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
            <Button onClick={handlePay}>PAGAR</Button>
          )}
        </>
      )}
    </Container>
  );
};

export default Peronio;
