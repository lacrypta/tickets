import { BigNumber } from "ethers";

import {
  Address,
  useAccount,
  useBalance,
  useContract,
  useContractRead,
} from "wagmi";
import { IPermit } from "../types/crypto";

import PeronioABI from "../abi/Peronio.json";

import { useState } from "react";

const ZERO = BigNumber.from(0);

const PERONIO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PERONIO_CONTRACT || "";
const GATEWAY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT || "";

interface ISpendableResult {
  balance: BigNumber;
  allowance: BigNumber;
  permit?: BigNumber;
  max: BigNumber;
}

const useSpendable = (permit?: IPermit): ISpendableResult => {
  const { address } = useAccount();
  const [permitAmount, setPermitAmount] = useState<BigNumber>(ZERO);

  const validatePermit = async (permit: IPermit): Promise<boolean> => {
    const res = await permitContract?.callStatic.permit(
      permit.owner,
      permit.spender,
      permit.value,
      permit.deadline,
      permit.v,
      permit.r,
      permit.s
    );
    if (res) {
      setPermitAmount(res);
      return true;
    }
    return false;
  };

  const permitContract = useContract({
    address: PERONIO_CONTRACT_ADDRESS as Address,
    abi: PeronioABI,
  });

  // Fetch Data
  const { data: balanceRes } = useBalance({
    addressOrName: address,
    token: PERONIO_CONTRACT_ADDRESS as Address,
    watch: true,
  });

  const { data: allowanceRes } = useContractRead({
    address: PERONIO_CONTRACT_ADDRESS,
    abi: PeronioABI,
    functionName: "allowance",
    args: [address, GATEWAY_CONTRACT_ADDRESS],
    watch: true, // refresh on every block
  });

  // Validate Permit
  if (permit) {
    validatePermit(permit);
  }

  // Parse results
  const balance: BigNumber = balanceRes?.value || ZERO;
  // const allowance: BigNumber = allowanceRes?.value || ZERO;

  console.dir("allowanceRes: ");
  console.dir(allowanceRes);

  const allowance = BigNumber.from(0);

  const minValue =
    [balance, allowance, permitAmount]
      .sort((a, b) => (a.gt(b) ? 1 : -1))
      .pop() || ZERO;

  return {
    balance,
    allowance,
    permit: permitAmount,
    max: minValue,
  };
};

export default useSpendable;
