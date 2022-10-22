import { BigNumber, ethers } from "ethers";
import { ITransferVoucher, ITransferVoucherSigned } from "../types/Voucher";
import useGateway from "./useGateway";

interface IBuildVoucherArgs {
  from: string;
  to: string;
  amount: BigNumber;
  deadline: number;
  message: string;
}

interface IUseVoucherResult {
  buildVoucher: (
    _voucherData: IBuildVoucherArgs
  ) => Promise<ITransferVoucher | undefined>;
  getSignatureMessage: (
    _voucher: ITransferVoucher
  ) => Promise<string | undefined>;

  tryServe: (_voucher: ITransferVoucherSigned) => Promise<any>;
  validate: (_voucher: ITransferVoucherSigned) => Promise<boolean>;
}

const useVoucher = (): IUseVoucherResult => {
  const { contract } = useGateway();

  // Build voucher
  const buildVoucher = async ({
    from,
    amount,
    deadline,
    message,
  }: IBuildVoucherArgs): Promise<ITransferVoucher | undefined> => {
    const nonce = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toHexString();

    contract?.["buildPurchaseVoucher(uint256,uint256,address,uint256,string)"](
      nonce,
      deadline,
      from,
      amount,
      message
    );

    return contract?.["buildPurchaseVoucher(uint256,address,uint256,string)"](
      nonce,
      from,
      amount,
      message
    );
  };

  // Generate signature string with voucher
  const getSignatureMessage = async (
    voucher: ITransferVoucher
  ): Promise<string | undefined> => {
    return contract?.stringifyVoucher(voucher);
  };

  // Simulate static call
  const tryServe = async (signedVoucher: ITransferVoucherSigned) => {
    const { full: signature } = signedVoucher.signature;
    return contract?.callStatic[
      "serveVoucher((uint32,uint256,uint256,bytes,bytes),bytes)"
    ](signedVoucher.voucher, signature);
  };

  // Validate Voucher
  const validate = async (signedVoucher: ITransferVoucherSigned) => {
    const { full: signature } = signedVoucher.signature;
    if (!contract) {
      return false;
    }
    try {
      await contract[
        "validateVoucher((uint32,uint256,uint256,bytes,bytes),bytes)"
      ](signedVoucher.voucher, signature);
      return true;
    } catch (e: any) {
      return false;
    }
  };

  return { buildVoucher, getSignatureMessage, tryServe, validate };
};

export default useVoucher;
