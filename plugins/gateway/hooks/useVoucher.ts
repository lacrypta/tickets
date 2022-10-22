import { BigNumber, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { ITransferVoucher, ITransferVoucherSigned } from "../types/Voucher";
import useGateway from "./useGateway";

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
    amount,
    deadline,
    orderId,
  }: IBuildVoucherArgs): Promise<ITransferVoucher | undefined> => {
    const nonce = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toHexString();

    const formattedAmount = formatUnits(amount, 6);
    const message = `Pagar la cuenta de la Orden #${orderId}\nMonto: ${formattedAmount}`;

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
    const { deadline, metadata, nonce, payload, tag } = signedVoucher.voucher;
    const voucher = { deadline, metadata, nonce, payload, tag };
    return contract?.callStatic[
      "serveVoucher((uint32,uint256,uint256,bytes,bytes),bytes)"
    ](voucher, signature);
  };

  return { buildVoucher, getSignatureMessage, tryServe };
};

export default useVoucher;
