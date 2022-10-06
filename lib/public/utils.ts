import { BigNumber, ethers } from "ethers";
import { ITransferVoucher } from "../../types/crypto";

// let message = "👉👉👉  AUTORIZO EL PAGO  👈👈👈\n";
// message += "💲 Monto: " + formatUnits(voucher.payload.amount, 6) + " P\n";
// message += "#️⃣ Order: " + voucher.metadata + "\n";
// message += "🧑 Destino: " + voucher.payload.to + "\n";
// message += "\n";
// message += "🟰🟰🟰🟰🟰🟰🟰 DATA 🟰🟰🟰🟰🟰🟰🟰\n";
// message +=
//   "3afs5df67sd6f75a7684ds67f87sa43afs5df67sd6f75a7684ds67f87sa43afs5df67sd6f75a7684ds67f87sa47f6a5s4dfas6574453sd4a5f34as6533sd546f3sd786f5a7s9d86fsa87df5a7";
// return message;

// const encodedVoucher = encodeVoucher(voucher);
// const encodedVoucher = [
//   BigNumber.from(10).toString(),
//   BigNumber.from(voucher.nonce).toString(),
//   BigNumber.from(voucher.deadline).toString(),
//   [
//     voucher.payload.from.toString(),
//     voucher.payload.to.toString(),
//     BigNumber.from(voucher.payload.amount).toString(),
//   ],
//   voucher.metadata.toString(),
// ];

const utf8Encode = new TextEncoder();

const encodeVoucher = (voucher: ITransferVoucher) => {
  return {
    tag: BigNumber.from(10).toString(),
    nonce: BigNumber.from(voucher.nonce).toString(),
    deadline: BigNumber.from(voucher.deadline).toString(),
    payload: ethers.utils.solidityPack(
      ["uint256", "uint256", "uint256"],
      [voucher.payload.from, voucher.payload.to, voucher.payload.amount]
    ),
    metadata: utf8Encode.encode(voucher.metadata),
  };
};

export { encodeVoucher };
