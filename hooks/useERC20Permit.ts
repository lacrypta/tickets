import { useAccount, useContract, useProvider, useSignTypedData } from "wagmi";
import { splitSignature } from "@ethersproject/bytes";
import { ISignature } from "../plugins/gateway/types/Signature";

import ERC20PermitAbi from "../abi/ERC20Permit.json";

const PERONIO_ADDRESS = process.env.NEXT_PUBLIC_PERONIO_CONTRACT || "";

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
  const provider = useProvider();
  const { signTypedDataAsync } = useSignTypedData();

  const erc20Contract = useContract({
    addressOrName: PERONIO_ADDRESS,
    contractInterface: ERC20PermitAbi,
    signerOrProvider: provider,
  });

  const requestSignature = async ({
    name,
    contract,
    spender,
    value,
    deadline,
  }: IRequestSignatureArgs): Promise<ISignature> => {
    const nonce = await erc20Contract.nonces(owner);

    const toSign = {
      domain: {
        name: name,
        version: "1",
        chainId: 137,
        verifyingContract: contract,
      },
      types,
      value: {
        owner: owner,
        spender: spender,
        value,
        nonce,
        deadline,
      },
    };

    console.dir(toSign);

    const data = await signTypedDataAsync(toSign);
    const { r, s, v } = splitSignature(data);
    return { r, s, v, full: data };
  };

  return { requestSignature };
};

export default useERC20Permit;
