import { useEffect, useState } from "react";
import { useAccount, useSignTypedData } from "wagmi";
import { splitSignature } from "@ethersproject/bytes";
import { ISignature } from "../types/crypto";
import { ethers } from "ethers";

const types = {
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
};

interface IRequestSignatureArgs {
  name: string;
  contract: string;
  spender: string;
  value: string;
  deadline: number;
}

interface IUseERC20PermitResult {
  signature?: ISignature;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  requestSignature: (_args: IRequestSignatureArgs) => void;
}

const useERC20Permit = (): IUseERC20PermitResult => {
  const { address: owner } = useAccount();

  const [signature, setSignature] = useState<ISignature>();

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData();

  const requestSignature = async ({
    name,
    contract,
    spender,
    value,
    deadline,
  }: IRequestSignatureArgs) => {
    const nonce = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toHexString();

    setSignature(undefined);

    signTypedData({
      domain: {
        name: name,
        version: "1",
        chainId: 137,
        verifyingContract: contract,
      },
      types,
      value: {
        owner: owner?.toLocaleLowerCase(),
        spender: spender,
        value,
        nonce,
        deadline: deadline,
      },
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      console.info("data:");
      console.dir(data);

      const { r, s, v } = splitSignature(data);
      console.info("setting signature");
      setSignature({ r, s, v });
    }
  }, [data, isLoading, isSuccess]);

  return { signature, isError, isLoading, isSuccess, requestSignature };
};

export default useERC20Permit;
