import { BigNumber, ethers } from "ethers";
import { IVoucher, IVoucherSigned } from "../types/Voucher";
import useGateway from "./useGateway";

interface IBuildVoucherArgs {
  from: string;
  amount: BigNumber;
  deadline: number;
  message: string;
}

interface IUseVoucherResult {
  buildVoucher: (
    _voucherData: IBuildVoucherArgs
  ) => Promise<IVoucher | undefined>;
  getSignatureMessage: (_voucher: IVoucher) => Promise<string | undefined>;

  tryServe: (_voucher: IVoucherSigned) => Promise<any>;
  validate: (_voucher: IVoucherSigned) => Promise<boolean>;
}

const useVoucher = (): IUseVoucherResult => {
  const { contract } = useGateway();

  // Build voucher
  const buildVoucher = async ({
    from,
    amount,
    deadline,
    message,
  }: IBuildVoucherArgs): Promise<IVoucher | undefined> => {
    const nonce = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toHexString();

    return contract?.[
      "buildPurchaseVoucher(uint256,uint256,address,uint256,string)"
    ](nonce, deadline, from, amount, message);
  };

  // Generate signature string with voucher
  const getSignatureMessage = async (
    voucher: IVoucher
  ): Promise<string | undefined> => {
    return contract?.stringifyVoucher(voucher);
  };

  // Simulate static call
  const tryServe = async (signedVoucher: IVoucherSigned) => {
    const { full: signature } = signedVoucher.signature;
    return contract?.callStatic[
      "serveVoucher((uint32,uint256,uint256,bytes,bytes),bytes)"
    ](signedVoucher.voucher, signature);
  };

  // Validate Voucher
  const validate = async (signedVoucher: IVoucherSigned) => {
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
