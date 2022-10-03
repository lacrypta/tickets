import { useContext } from "react";

import { useAccount } from "wagmi";
import { CartContext } from "../contexts/Cart";
import { OrderContext } from "../contexts/Order";
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
  payOrder: (_signature: any) => void;
}

const ajaxCreateOrder = async (
  requestData: ICreateOrderRequestBody
): Promise<ResponseDataType> => {
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
  const {
    orderId,
    setOrderId,
    isLoading,
    setIsLoading,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
    error,
    setError,
  } = useContext(OrderContext);

  const createOrder = async () => {
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
    setOrderId(res.data.id);
    setIsLoading(false);
  };

  const payOrder = async (permit: any) => {
    console.info("permit:");
    console.dir(permit);
  };

  return {
    orderId,
    isLoading,
    isSuccess,
    isError,
    error,
    createOrder,
    payOrder,
  };
};

export default useOrder;
