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

const TICKET_PRICE = parseFloat(
  process.env.NEXT_PUBLIC_TICKET_PRICE_PE || "1000"
);
const PERONIO_ADDRESS = process.env.NEXT_PUBLIC_PERONIO_ADDRESS || "";
const BAR_ADDRESS = process.env.NEXT_PUBLIC_BAR_ADDRESS || "";

const claimApprove = async (
  data: ICreateCryptoPaymentRequestBody
): Promise<ResponseDataType> => {
  const res = await fetch("/api/gateway/crypto/create", {
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

  const [isTxLoading, setIsTxLoading] = useState<boolean>(false);

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
    if (!isSuccess || !orderId || !address || !data) {
      return;
    }
    setIsTxLoading(true);

    console.info("llega data");
    console.dir(data);
  }, [address, data, isSuccess, orderId, peAmount]);

  useEffect(() => {
    if (isTxLoading) {
      return;
    }
    console.info("Claiming!!");
    // claimApprove({
    //   orderId,
    //   address,
    //   amount: peAmount.toString(),
    //   tx: data.hash,
    // }).then((res) => {
    //   console.info("res:");
    //   console.dir(res);
    // });
  }, [isTxLoading]);

  return (
    <Container>
      <h3>Peronio</h3>
      <div>Precio en PE: {TICKET_PRICE.toFixed(2)}</div>
      {isTxLoading ? (
        <>
          <div>Esperando confirmación de transacción...</div>
          <div>{data?.hash}</div>
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
