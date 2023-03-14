import { useCallback } from "react";
import { IOrder } from "../../../types/order";
import { db, doc, updateDoc } from "../../../lib/public/firebase";

interface OrderProps {
  order: IOrder;
}

export const Order = ({ order }: OrderProps) => {
  const setAsPaid = useCallback(() => {
    const paymentRef = doc(db, "payments", order.paymentId as string);

    updateDoc(paymentRef, {
      status: "executing",
    });
  }, [order.paymentId]);

  return (
    <div className='flex flex-row items-center justify-between p-2 hover:bg-white/[0.08]'>
      <div className='flex-col'>
        <div>{order.user.fullname}</div>
        <div>{order.user.email}</div>
      </div>
      <div className='bg-gray-700/[0.5] rounded-lg ring-offset-4 ring-white hover:bg-gray-300/[0.5] active:bg-gray-600/[0.2] text-white p-3'>
        {order.status === "pending" && (
          <button className='' onClick={setAsPaid}>
            PAGADO
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
