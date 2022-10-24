import { BigNumber, ethers } from "ethers";
import { IVoucher, IVoucherSigned } from "../types/Voucher";
import useGateway from "./useGateway";

interface IBuildVoucherArgs {
  from: string;
  amount: BigNumber;
  validUntil: number;
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
    validUntil,
    message,
  }: IBuildVoucherArgs): Promise<IVoucher | undefined> => {
    const nonce = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toHexString();

    try {
      if (!contract) {
        throw new Error("No contract address providede");
      }
      console.info("Contract Address:");
      console.info(contract.address);

      console.info("Voucher data:");
      console.dir({ nonce, validUntil, from, amount, message });

      const voucher = await contract?.[
        "buildPurchaseVoucher(uint256,uint256,address,uint256,string)"
      ](nonce, validUntil, from, amount, message);

      console.info("BUILT VOUCHER");
      console.dir(await voucher);
      return voucher;
    } catch (e: any) {
      console.info("Error building Voucher");
      console.dir(e);
      return undefined;
    }
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
      "serveVoucher((uint32,uint256,uint256,uint256,bytes,bytes),bytes)"
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
        "validateVoucher((uint32,uint256,uint256,uint256,bytes,bytes),bytes)"
      ](signedVoucher.voucher, signature);
      return true;
    } catch (e: any) {
      return false;
    }
  };

  return { buildVoucher, getSignatureMessage, tryServe, validate };
};

export default useVoucher;
