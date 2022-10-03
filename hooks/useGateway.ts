import { useEffect, useState } from "react";
import { useSignTypedData } from "wagmi";
import { splitSignature } from "@ethersproject/bytes";
import { ISignature, ITransferVoucher } from "../types/crypto";

// struct TransferVoucher {
//     address from;
//     address to;
//     uint256 amount;
//     uint256 deadline;
//     //
//     uint256 fee;
//     uint256 nonce;
// }

// TYPEHASH
// execute(TransferVoucher{address,address,uint256,uint256,uint256,uint256})
const types = {
  Execute: [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "deadline", type: "uint256" },

    { name: "fee", type: "uint256" },
    { name: "nonce", type: "uint256" },
  ],
};

interface IRequestSignatureArgs {
  from: string;
  to: string;
  amount: string;
  deadline: number;
  fee: number;
}

interface IUseGatewayResult {
  signature?: ISignature;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  payload?: ITransferVoucher;
  requestSignature: (_args: IRequestSignatureArgs) => void;
}

const useGateway = (
  contractName: string,
  contractAddress: string,
  onSuccess?: (_args: any) => void
): IUseGatewayResult => {
  const [signature, setSignature] = useState<ISignature>();
  const [payload, setPayload] = useState<ITransferVoucher>();

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      onSuccess,
    });

  const requestSignature = async ({
    from,
    to,
    amount,
    deadline,
    fee,
  }: IRequestSignatureArgs) => {
    const nonce =
      "0x0000000000000000000000000000000000000000000000000000000000000000"; // TODO: Look for nonce

    setSignature(undefined);

    const _payload: ITransferVoucher = {
      from,
      to,
      amount,
      deadline: String(deadline),
      fee: String(fee),
      nonce,
    };

    setPayload(_payload);

    signTypedData({
      domain: {
        name: contractName,
        version: "1",
        chainId: 137,
        verifyingContract: contractAddress,
      },
      types,
      value: _payload,
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      const { r, s, v } = splitSignature(data);
      setSignature({ r, s, v });
    }
  }, [data, isLoading, isSuccess]);

  return {
    payload,
    signature,
    isError,
    isLoading,
    isSuccess,
    requestSignature,
  };
};

export default useGateway;
