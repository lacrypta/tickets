import { BigNumber, ethers } from "ethers";
import useGateway from "./useGateway";

const utf8Encode = new TextEncoder();

interface IBuildVoucherArgs {
  from: string;
  to: string;
  amount: BigNumber;
  deadline: number;
  orderId: string;
}

interface IUseVoucherResult {
  buildVoucher: (_args: IBuildVoucherArgs) => void;
}

const useVoucher = (): IUseVoucherResult => {
  const { contract } = useGateway();

  const buildVoucher = async ({
    from,
    to,
    amount,
    deadline,
    orderId,
  }: IBuildVoucherArgs) => {
    const nonce = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toHexString();

    const metadata = utf8Encode.encode(orderId);

    console.info("Contract:");
    console.dir(contract);

    console.info("DATA?");

    console.dir({ nonce, deadline, from, to, amount, metadata });

    return contract?.[
      "buildTransferFromVoucher(uint256,uint256,address,address,uint256,bytes)"
    ](nonce, deadline, from, to, amount, metadata);
  };

  return { buildVoucher };
};

export default useVoucher;
