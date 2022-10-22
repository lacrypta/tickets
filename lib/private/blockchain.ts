import { IVoucher } from "./../../plugins/gateway/types/Voucher";
import { Contract, ethers } from "ethers";
import { Interface } from "ethers/lib/utils";

import BarGatewayJSON from "@lacrypta/bar-gateway/deployments/matic/BarGateway.json";

import ERC20PermitAbi from "../../abi/ERC20Permit.json";

const { address, abi: gatewayAbi } = BarGatewayJSON;

import { ISignature } from "../../plugins/gateway/types/Signature";
import { IPermit } from "../../types/crypto";
// import {} from "@lacrypta/bar-gateway/";

// contract details
const RPC_ADDRESS = process.env.NEXT_PUBLIC_RPC_ADDRESS || "";
const PERONIO_ADDRESS = process.env.NEXT_PUBLIC_PERONIO_CONTRACT || "";
const GATEWAY_ADDRESS = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT || address;
const CALLER_PRIVATE_KEY = process.env.CALLER_PRIVATE_KEY || "";

const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS);
const signer = new ethers.Wallet(CALLER_PRIVATE_KEY, provider);

// Bar Contract
const gatewayContract = new Contract(GATEWAY_ADDRESS, gatewayAbi, signer);
// Token Contract
const tokenContract = new Contract(PERONIO_ADDRESS, ERC20PermitAbi, signer);

const transferAbi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
];

export async function getTx(txHash: string) {
  return provider.getTransaction(txHash);
}

export async function getTxReceipt(txHash: string) {
  const receipt = provider.getTransactionReceipt(txHash);
  return receipt;
}

export async function getTransferEvent(txHash: string) {
  const receipt = await getTxReceipt(txHash);
  const iface = new Interface(transferAbi);
  const event = receipt.logs[0];
  const { from, to, value } = iface.decodeEventLog(
    "Transfer",
    event.data,
    event.topics
  );

  return { raw: event, decoded: { from, to, value } };
}

export async function serveVoucher(
  voucher: IVoucher,
  signature: ISignature
): Promise<string> {
  const tx = gatewayContract[
    "serveVoucher((uint32,uint256,uint256,bytes,bytes),bytes)"
  ](voucher, signature.full);

  console.info("Broadcasting tx...");
  console.dir(await tx);
  return (await tx).hash;
}

export async function runPermit(permit: IPermit) {
  const { owner, spender, value, deadline, v, r, s } = permit;

  console.info("Executing PERMIT on", tokenContract.address);
  console.info("PERMIT:");
  console.dir(permit);

  return tokenContract.permit(owner, spender, value, deadline, v, r, s);
}
