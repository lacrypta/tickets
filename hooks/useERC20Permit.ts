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
  requestSignature: (_args: IRequestSignatureArgs) => Promise<ISignature>;
}

const useERC20Permit = (): IUseERC20PermitResult => {
  const { address: owner } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();

  const requestSignature = async ({
    name,
    contract,
    spender,
    value,
    deadline,
  }: IRequestSignatureArgs): Promise<ISignature> => {
    const nonce = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toHexString();

    const data = await signTypedDataAsync({
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
        deadline,
      },
    });

    return splitSignature(data);
  };

  return { requestSignature };
};

export default useERC20Permit;
