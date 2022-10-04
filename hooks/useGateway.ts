import { useEffect, useState } from "react";
import { useSignTypedData } from "wagmi";
import { splitSignature } from "@ethersproject/bytes";
import { ISignature, ITransferVoucher } from "../types/crypto";

const TRANSFER_FROM_TAG = "123123";

const types = {
  Payload: [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "amount", type: "uint256" },
  ],
  Voucher: [
    { name: "tag", type: "uint32" },
    //
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
    { name: "payload", type: "Payload" },
    //
    { name: "metadata", type: "uint256" },
  ],
};

interface IRequestSignatureArgs {
  from: string;
  to: string;
  amount: string;
  deadline: number;
  orderId: string;
}

interface IUseGatewayResult {
  signature?: ISignature;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  voucher?: ITransferVoucher;
  requestSignature: (_args: IRequestSignatureArgs) => void;
}

const useGateway = (
  contractName: string,
  contractAddress: string,
  onSuccess?: (_args: any) => void
): IUseGatewayResult => {
  const [signature, setSignature] = useState<ISignature>();
  const [voucher, setVoucher] = useState<ITransferVoucher>();

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      onSuccess,
    });

  const requestSignature = async ({
    from,
    to,
    amount,
    deadline,
    orderId,
  }: IRequestSignatureArgs) => {
    const nonce =
      "0x0000000000000000000000000000000000000000000000000000000000000000"; // TODO: Look for nonce

    setSignature(undefined);

    const _voucher: ITransferVoucher = {
      tag: TRANSFER_FROM_TAG,
      //
      nonce,
      deadline: String(deadline),
      payload: {
        from,
        to,
        amount,
      },
      //
      metadata: orderId,
    };

    setVoucher(_voucher);

    signTypedData({
      domain: {
        name: contractName,
        version: "1",
        chainId: 137,
        verifyingContract: contractAddress,
      },
      types,
      value: _voucher,
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      const { r, s, v } = splitSignature(data);
      setSignature({ r, s, v });
    }
  }, [data, isLoading, isSuccess]);

  return {
    voucher,
    signature,
    isError,
    isLoading,
    isSuccess,
    requestSignature,
  };
};

export default useGateway;
