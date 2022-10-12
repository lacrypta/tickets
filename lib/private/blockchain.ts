import Web3 from "web3";
import { Transaction } from "@ethereumjs/tx";
import { CustomChain, Common } from "@ethereumjs/common";
import { StateMutabilityType, AbiType } from "web3-utils/types";

import { log } from "./firestore";

export async function sendFunds(address: string) {
  return claim(address);
}

// contract details
const provider = process.env.RPC_ADDRESS ?? "";
const contractAddress = process.env.FAUCET_CONTRACT;
const privateKey = Buffer.from(
  process.env.FAUCET_OWNER_PRIVATE_KEY ?? "",
  "hex"
);
const defaultAccount = process.env.FAUCET_OWNER_PUBLIC_ADDRESS ?? "";

const customCommon = Common.custom(
  {
    name: CustomChain.PolygonMainnet,
    chainId: 137,
    url: provider,
  },
  {
    baseChain: "mainnet",
    hardfork: "london",
  }
);

// initiate the web3
const web3 = new Web3(provider);

// Get Contract
function getContract() {
  const abi = [
    {
      inputs: [
        {
          internalType: "address payable",
          name: "recipient",
          type: "address",
        },
      ],
      name: "claim",
      outputs: [],
      stateMutability: "payable" as StateMutabilityType,
      type: "function" as AbiType,
    },
  ];
  return new web3.eth.Contract(abi, contractAddress);
}
// Claim
async function claim(address: string) {
  if (address) {
    const rawTrans = getContract().methods.claim(address); // contract method
    return sendSignTransaction(rawTrans);
  } else {
    throw "Wallet address or no. of tokens is missing.";
  }
}

// Send Signed Transaction
async function sendSignTransaction(rawTrans: any) {
  // Initiate values required by the dataTrans
  if (rawTrans) {
    const txCount = await web3.eth.getTransactionCount(
      defaultAccount,
      "pending"
    ); // needed for nonce

    const abiTrans = rawTrans.encodeABI(); // encoded contract method
    const gas = await rawTrans.estimateGas({ from: defaultAccount });

    var gasPrice = Number(await web3.eth.getGasPrice()) * 4;
    var gasLimit = gas * 2;

    // Initiate the transaction data

    var dataTrans = {
      to: contractAddress,
      data: abiTrans,
      chainId: 137,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      value: "0x00",
    };

    log("tx", dataTrans);

    // sign transaction
    let tx = new Transaction(dataTrans, {
      common: customCommon,
    });

    tx = tx.sign(privateKey);

    console.info("TX:", tx);

    // after signing send the transaction
    return await sendSigned(tx);
  } else {
    throw new Error("Encoded raw transaction was not given.");
  }
}
function sendSigned(tx: Transaction) {
  return new Promise<string>(function (resolve, reject) {
    // send the signed transaction
    web3.eth
      .sendSignedTransaction("0x" + tx.serialize().toString("hex"))
      .once("transactionHash", function (hash) {
        // respond with the result
        resolve(hash);
      })
      .then((out) => {
        console.log(out);
      })
      .catch((err) => {
        // respond with error
        reject(err);
      });
  });
}
