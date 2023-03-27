import { useCallback, useState } from "react";
import { IOrder } from "../../../types/order";
import { db, doc, updateDoc } from "../../../lib/public/firebase";

interface OrderProps {
  order: IOrder;
}

export const Order = ({ order }: OrderProps) => {
  const [processing, setProcessing] = useState(false);
  const setAsPaid = useCallback(() => {
    const paymentRef = doc(db, "payments", order.paymentId as string);
    setProcessing(true);
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
      <div>
        {order.status === "pending" && (
          <button
            disabled={processing}
            className='bg-gray-700/[0.5] rounded-lg ring-offset-4 ring-white enabled:hover:bg-gray-300/[0.5] enabled:active:bg-gray-600/[0.2] text-white p-3 disabled:opacity-25'
            onClick={setAsPaid}
          >
            {processing ? "Procesando..." : "Marcar como pagado"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
