import { useContext, useState } from "react";

import { useAccount } from "wagmi";
import { CartContext } from "../contexts/Cart";
import { ICart } from "../types/cart";
import { ICreateOrderRequestBody, ResponseDataType } from "../types/request";

export interface IOrder {}
export interface IUseUserResult {
  orderId?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: string;
  createOrder: () => void;
}

const ajaxCreateOrder = async (
  requestData: ICreateOrderRequestBody
): Promise<ResponseDataType> => {
  console.info("Initiating request");
  console.dir(requestData);

  const res = await fetch("/api/order/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  return await res.json();
};

const generateRequest = (
  address: string,
  cart: ICart
): ICreateOrderRequestBody => {
  return {
    address,
    items: Object.values(cart.items).map((item) => {
      return {
        id: item.product.id,
        qty: item.qty,
      };
    }),
  };
};

const useOrder = (): IUseUserResult => {
  const { address } = useAccount();
  const { cart } = useContext(CartContext);

  const [orderId, setOrderId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const [error, setError] = useState<string>();

  const createOrder = async () => {
    console.info("Creating Order");
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setOrderId(undefined);

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
    setOrderId(res.data.id);
    setIsLoading(false);
  };

  return { orderId, isLoading, isSuccess, isError, error, createOrder };
};

export default useOrder;
