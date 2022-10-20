import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils";

// contract details
const RPC_ADDRESS = process.env.NEXT_PUBLIC_RPC_ADDRESS || "";

const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS);

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
