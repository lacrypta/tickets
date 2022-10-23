import { IVoucherSignedStringified } from "./../../plugins/gateway/types/Voucher";
import { IVoucherSigned } from "../../plugins/gateway/types/Voucher";
import { ICart, ICartItem, IOrderItem } from "../../types/cart";

const generatePermitData = (
  contractAddress?: string,
  gatewayAddress?: string,
  signupTTL?: string
) => {
  return {
    name: "Peronio",
    contract: contractAddress ?? "",
    spender: gatewayAddress ?? "",
    value: "1000000000000000000000000000000000000000000000", // TODO: Generate proper unlimited
    deadline: Math.floor(Date.now() / 1000) + parseInt(signupTTL || "43200"), // 12 hours
  };
};

const formatVoucher = (voucher: IVoucherSigned): IVoucherSignedStringified => {
  const { deadline, metadata, nonce, payload, tag } = voucher.voucher;
  const { r, s, v, full } = voucher.signature;
  return {
    voucher: {
      deadline: deadline.toString(),
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

const generateCart = (items: IOrderItem[]): ICart => {
  const cartItems: { [index: string]: ICartItem } = {};
  let total = 0;
  items.forEach((item) => {
    const name = "NOMBREEE";
    const price = 6788.99;
    cartItems[item.id] = {
      product: {
        id: item.id,
        name,
        price,
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
