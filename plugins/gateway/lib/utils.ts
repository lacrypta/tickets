import { ethers } from "ethers";

export const decodePayload = (payload: string) => {
  const abiCoder = ethers.utils.defaultAbiCoder;
  const [from, to, amount] = abiCoder.decode(
    ["address", "address", "uint256"],
    payload
  );
  return {
    from,
    to,
    amount,
  };
};
