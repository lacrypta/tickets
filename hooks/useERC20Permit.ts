import { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { splitSignature } from "@ethersproject/bytes";
import { parseUnits } from "ethers/lib/utils";

const types = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ],
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
};

interface IUsePermitProps {
  name: string;
  contract: string;
  spender: string;
  value: string;
  deadline: number;
}

const generateTypedData = (
  name: string,
  owner: string,
  contract: string,
  spender: string,
  value: string,
  deadline: number,
  nonce: string = "0x0000000000000000000000000000000000000000000000000000000000000000"
) => {
  return {
    types,
    primaryType: "Permit",
    domain: {
      name: name,
      version: "1",
      chainId: 137,
      verifyingContract: contract,
    },
    message: {
      owner: owner?.toLocaleLowerCase(),
      spender: spender,
      value: parseUnits(value, 6),
      nonce,
      deadline: deadline,
    },
  };
};

const useERC20Permit = ({
  name,
  contract,
  spender,
  value,
  deadline,
}: IUsePermitProps) => {
  const { data: signer } = useSigner();
  const { address: owner } = useAccount();

  const [signature, setSignature] = useState({});

  const typedData = generateTypedData(
    name,
    owner ?? "",
    contract,
    spender,
    value,
    deadline
  );

  const requestSignature = async () => {
    try {
      const signature = await signer?.provider?.send("eth_signTypedData_v4", [
        owner,
        JSON.stringify(typedData),
      ]);
      const splittedSignature = splitSignature(signature);
      setSignature(splittedSignature);
      return true;
    } catch (e) {
      return false;
    }
  };

  return { signature, requestSignature };
};

export default useERC20Permit;
