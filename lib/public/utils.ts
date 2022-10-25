import { IVoucherSignedStringified } from "./../../plugins/gateway/types/Voucher";
import { IVoucherSigned } from "../../plugins/gateway/types/Voucher";
import { ICart, ICartItem } from "../../types/cart";
import { IOrderItem } from "../../types/order";
import { getIndexedMenu } from "./menu";
import { BigNumber } from "ethers";

const generatePermitData = (
  contractAddress?: string,
  gatewayAddress?: string,
  signupTTL?: string
) => {
  return {
    name: "Peronio",
    contract: contractAddress ?? "",
    spender: gatewayAddress ?? "",
    value: BigNumber.from("1").shl(256).sub(1).toString(),
    deadline: Math.floor(Date.now() / 1000) + parseInt(signupTTL || "43200"), // 12 hours
  };
};

const formatVoucher = (voucher: IVoucherSigned): IVoucherSignedStringified => {
  const { validUntil, validSince, metadata, nonce, payload, tag } =
    voucher.voucher;
  const { r, s, v, full } = voucher.signature;
  return {
    voucher: {
      validUntil: validUntil.toString(),
      validSince: validSince.toString(),
      metadata,
      nonce: nonce.toString(),
      payload,
      tag: tag,
    },
    signature: {
      r,
      s,
      v,
      full,
    },
  };
};

const generateMessage = (orderId: string, total: string, _cart?: ICart) => {
  const formattedAmount = parseFloat(total).toFixed(2);
  return `Pagar la cuenta de la Orden #${orderId}\nMonto: ${formattedAmount}`;
};

const generateCart = async (items: IOrderItem[]): Promise<ICart> => {
  const cartItems: { [index: string]: ICartItem } = {};
  let total = 0;

  const indexedMenu = await getIndexedMenu();

  items.forEach((item) => {
    const { name, price, cat } = indexedMenu[item.id];
    cartItems[item.id] = {
      product: {
        id: item.id,
        name,
        price,
        cat,
      },
      qty: item.qty,
    };
    total += item.qty * price;
  });

  return {
    total: total,
    items: cartItems,
  };
};

export { generatePermitData, formatVoucher, generateMessage, generateCart };
