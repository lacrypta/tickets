import { useContext } from "react";

import { useAccount } from "wagmi";
import { CartContext } from "../contexts/Cart";
import { OrderContext } from "../contexts/Order";
import { ICart } from "../types/cart";
import { ITransferVoucherSigned } from "../types/crypto";
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
  isError?: boolean;
  error?: string;
  createOrder: () => void;
  payOrder: (_signature: any) => void;
}

const ajaxCall = async (path: string, data: any): Promise<ResponseDataType> => {
  const res = await fetch("/api/" + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

const ajaxCreateOrder = async (
  requestData: ICreateOrderRequestBody
): Promise<ResponseDataType> => {
  return ajaxCall("order/create", requestData);
};

const ajaxCreatePayment = async (
  requestData: IPaymentRequestBody
): Promise<ResponseDataType> => {
  console.info("requestData:");
  console.dir(requestData);
  return ajaxCall("gateway/pay", requestData);
};

const generateRequest = (
  address: string,
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
  } = useContext(OrderContext);

  async function createOrder() {
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
    const orderRequest = generateRequest(address, cart);
    // Ajax Request
    const res = await ajaxCreateOrder(orderRequest);

    // Parse Data
    setOrderId(String(res.data.id));
    setOrderTotal(String(res.data.total));
    setIsLoading(false);
  }

  const payOrder = async (voucher: ITransferVoucherSigned) => {
    console.info("Pay Order");
    console.info(typeof orderId);
    ajaxCreatePayment({
      orderId,
      voucher,
    });
  };

  return {
    orderId,
    isLoading,
    isSuccess,
    isError,
    error,
    orderTotal,
    createOrder: createOrder.bind(this),
    payOrder,
  };
};

export default useOrder;
