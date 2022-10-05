import { BigNumber } from "ethers";
import { AbiCoder, defaultAbiCoder } from "ethers/lib/utils";
import { ITransferVoucher } from "../../types/crypto";

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

// const encodedVoucher = {
//   tag: BigNumber.from(10).toString(),
//   nonce: BigNumber.from(voucher.nonce).toString(),
//   deadline: BigNumber.from(voucher.deadline).toString(),
//   payload: {
//     from: voucher.payload.from.toString(),
//     to: voucher.payload.to.toString(),
//     amount: BigNumber.from(voucher.payload.amount).toString(),
//   },
//   metadata: voucher.metadata.toString(),
// };

const encodeVoucher = (voucher: ITransferVoucher) => {
  return defaultAbiCoder.encode(
    [
      "tuple(uint32 tag, uint256 nonce, uint256 deadline, bytes payload, bytes metadata)",
    ],
    [
      {
        tag: BigNumber.from(10),
        nonce: BigNumber.from(voucher.nonce),
        deadline: BigNumber.from(voucher.deadline),
        payload: defaultAbiCoder.encode(
          ["tuple(address from, address to, uint256 amount)"],
          [
            {
              from: voucher.payload.from,
              to: voucher.payload.to,
              amount: BigNumber.from(voucher.payload.amount),
            },
          ]
        ),
        metadata: defaultAbiCoder.encode(["uint"], [voucher.metadata]),
      },
    ]
  );
};

export { encodeVoucher };
