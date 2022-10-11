import { useContext } from "react";

import { useAccount } from "wagmi";
import { OrderContext } from "../contexts/Order";
import { ICreateOrderRequestBody, ResponseDataType } from "../types/request";

export interface IOrder {}
export interface IUseUserResult {
  orderId?: string;
  fullname: string;
  email: string;
  orderTotal: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isPayed?: boolean;
  isError?: boolean;
  error?: string;
  createOrder: (_order: ICreateOrderRequestBody) => void;
  setFullname: (_str: string) => void;
  setEmail: (_str: string) => void;
  clear: () => void;
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

const useOrder = (): IUseUserResult => {
  const { address } = useAccount();
  const {
    orderId,
    setOrderId,
    fullname,
    setFullname,
    email,
    setEmail,
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

  async function createOrder(order: ICreateOrderRequestBody) {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setOrderId("");

    // Ajax Request
    const res = await ajaxCreateOrder(order);

    // Parse Data
    setOrderId(String(res.data.id));
    setOrderTotal(String(res.data.total));
    setIsLoading(false);
  }

  return {
    orderId,
    fullname,
    email,
    isLoading,
    isSuccess,
    isError,
    error,
    orderTotal,
    isPayed,
    setFullname,
    setEmail,
    createOrder: createOrder.bind(this),
    clear,
  };
};

export default useOrder;
