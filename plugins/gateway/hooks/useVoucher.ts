import { BigNumber, ethers } from "ethers";
import { ITransferVoucher, ITransferVoucherSigned } from "../types/Voucher";
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
  buildVoucher: (
    _voucherData: IBuildVoucherArgs
  ) => Promise<ITransferVoucher | undefined>;
  getSignatureMessage: (
    _voucher: ITransferVoucher
  ) => Promise<string | undefined>;

  tryServe: (_voucher: ITransferVoucherSigned) => any;
}

const useVoucher = (): IUseVoucherResult => {
  const { contract } = useGateway();

  // Build voucher
  const buildVoucher = async ({
    from,
    to,
    amount,
    deadline,
    orderId,
  }: IBuildVoucherArgs): Promise<ITransferVoucher | undefined> => {
    const nonce = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toHexString();

    const metadata = utf8Encode.encode(orderId);

    return contract?.[
      "buildTransferFromVoucher(uint256,uint256,address,address,uint256,bytes)"
    ](nonce, deadline, from, to, amount, metadata);
  };

  // Generate signature string with voucher
  const getSignatureMessage = async (
    voucher: ITransferVoucher
  ): Promise<string | undefined> => {
    return contract?.stringifyVoucher(voucher);
  };

  // Simulate static call
  const tryServe = async (signedVoucher: ITransferVoucherSigned) => {
    const { r, s, v } = signedVoucher.signature;

    return contract?.callStatic[
      "serveVoucher((uint32,uint256,uint256,bytes,bytes),bytes32,bytes32,uint8)"
    ](signedVoucher.voucher, r, s, v);
  };

  return { buildVoucher, getSignatureMessage, tryServe };
};

export default useVoucher;
