import { BigNumber } from "ethers";

import { useAccount, useBalance, useContract, useContractRead } from "wagmi";
import { IPermit } from "../types/crypto";

import PeronioABI from "../abi/Peronio.json";
import ERC20PermitABI from "../abi/ERC20Permit.json";

import { useState } from "react";

const ZERO = BigNumber.from(0);

const PERONIO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PERONIO_CONTRACT ?? "";
const GATEWAY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT ?? "";

interface IUseSpendableProps {
  permit?: IPermit;
}
const useSpendable = ({ permit }: IUseSpendableProps): BigNumber => {
  const { address } = useAccount();
  const [permitAmount, setPermitAmount] = useState<BigNumber>(ZERO);

  const validatePermit = async (permit: IPermit): Promise<boolean> => {
    const res = await permitContract.callStatic.permit(
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
    }
  };

  const permitContract = useContract({
    addressOrName: PERONIO_CONTRACT_ADDRESS,
    contractInterface: PeronioABI,
  });

  const { data: balance } = useBalance({
    addressOrName: address,
    token: PERONIO_CONTRACT_ADDRESS,
    watch: true,
  });

  const { data: allowance } = useContractRead({
    addressOrName: PERONIO_CONTRACT_ADDRESS,
    contractInterface: PeronioABI,
    functionName: "allowance",
    args: [address, GATEWAY_CONTRACT_ADDRESS],
    watch: true, // refresh on every block
  });

  const { data: nonces } = useContractRead({
    // Refreshes permit check
    addressOrName: PERONIO_CONTRACT_ADDRESS,
    contractInterface: ERC20PermitABI,
    functionName: "nonces",
    args: [address],
    watch: true, // refresh on every block
  });

  // Validate Permit
  if (permit) {
    validatePermit(permit);
  }
  // TODO: Minimal number (BigNumber.min?) between [balance, allowance, permitAmount]
  return ZERO;
};

export default useSpendable;
