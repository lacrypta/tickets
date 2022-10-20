import { useContext } from "react";

import { useAccount } from "wagmi";
import { CartContext } from "../contexts/Cart";
import { OrderContext } from "../contexts/Order";
import { ajaxCall } from "../lib/public/request";
import { ITransferVoucherSigned } from "../plugins/gateway/types/Voucher";
import { ICart } from "../types/cart";
import {
  ICreateOrderRequestBody,
  IPaymentRequestBody,
  ResponseDataType,
} from "../types/request";

export interface IOrder {}
export interface IUseUserResult {
  orderId?: string;
  orderTotal: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isPayed?: boolean;
  isError?: boolean;
  error?: string;
  createOrder: (_paymentMethod: string) => void;
  clear: () => void;
  payOrder: (_signature: any) => void;
}

const ajaxCreateOrder = async (
  requestData: ICreateOrderRequestBody
): Promise<ResponseDataType> => {
  return ajaxCall("order/create", requestData);
};

const ajaxCreatePayment = async (
  requestData: IPaymentRequestBody
): Promise<ResponseDataType> => {
  return ajaxCall("gateway/pay", requestData);
};

const generateRequest = (
  address: string,
  paymentMethod: string,
  cart: ICart
): ICreateOrderRequestBody => {
  const items = Object.values(cart.items)
    .map((item) => {
      return {
        id: item.product.id,
        qty: item.qty,
      };
    })
    .filter((e) => e.qty > 0);

  return {
    address,
    paymentMethod,
    items,
  };
};

const useOrder = (): IUseUserResult => {
  const { address } = useAccount();
  const { cart } = useContext(CartContext);
  const {
    orderId,
    setOrderId,
    orderTotal,
    setOrderTotal,
    isLoading,
    setIsLoading,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
    error,
    setError,
    isPayed,
    setIsPayed,
    clear,
  } = useContext(OrderContext);

  async function createOrder(paymentMethod: string) {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setOrderId("");

    //  Return null on empty address or cart
    if (!address || !cart) {
      setIsError(true);
      setError("No address or cart");
      setIsLoading(false);
      return null;
    }
    const orderRequest = generateRequest(address, paymentMethod, cart);
    // Ajax Request
    const res = await ajaxCreateOrder(orderRequest);

    // Parse Data
    setOrderId(String(res.data.id));
    setOrderTotal(String(res.data.total));
    setIsLoading(false);
  }

  const payOrder = async (voucher: ITransferVoucherSigned) => {
    const res = await ajaxCreatePayment({
      orderId,
      voucher,
    });

    if (res.success) {
      setIsPayed(true);
    }
  };

  return {
    orderId,
    isLoading,
    isSuccess,
    isError,
    error,
    orderTotal,
    isPayed,
    createOrder: createOrder.bind(this),
    payOrder,
    clear,
  };
};

export default useOrder;
