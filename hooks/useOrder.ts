import { Dispatch, SetStateAction, useContext } from "react";

import { useAccount } from "wagmi";
import { CartContext } from "../contexts/Cart";
import { OrderContext } from "../contexts/Order";
import { ajaxCall } from "../lib/public/request";
import { ICart } from "../types/cart";
import { ICreateOrderRequestBody, ResponseDataType } from "../types/request";

export interface IUseUserResult {
  orderId?: string;
  orderTotal: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: string;
  setOrderId?: Dispatch<SetStateAction<string>>;
  createOrder: (_paymentMethod: string) => void;
  clear: () => void;
}

const ajaxCreateOrder = async (
  requestData: ICreateOrderRequestBody
): Promise<ResponseDataType> => {
  return ajaxCall("order/create", requestData);
};

const generateRequest = (
  paymentMethod: string,
  cart: ICart,
  address?: string
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
    clear,
  } = useContext(OrderContext);

  async function createOrder(paymentMethod: string) {
    console.info("Create Order!");
    console.info("paymentMethod:", paymentMethod);
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setOrderId("");

    //  Return null on empty address or cart
    if (!cart) {
      setIsError(true);
      setError("No address or cart");
      setIsLoading(false);
      return null;
    }
    const orderRequest = generateRequest(paymentMethod, cart, address);
    // Ajax Request
    const res = await ajaxCreateOrder(orderRequest);

    // Parse Data
    setOrderId(String(res.data.id));
    setOrderTotal(String(res.data.total));
    setIsLoading(false);
  }

  return {
    orderId,
    isLoading,
    isSuccess,
    isError,
    error,
    orderTotal,
    createOrder: createOrder.bind(this),
    setOrderId,
    clear,
  };
};

export default useOrder;
