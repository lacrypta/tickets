declare global {
  interface Window {
    order?: IOrder;
    payment?: IPayment;
  }
}

import { Suspense, useEffect, useState } from "react";
import useOrder from "../hooks/useOrder";
import { IOrder } from "../types/order";
import { IPayment } from "../types/payment";

export const Debugger = () => {
  const { order, payment } = useOrder();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    window.order = order;
    window.payment = payment;
  }, [order, payment]);

  if (!hasMounted) {
    return null;
  }

  return (
    <Suspense>
      <div className='bg-white w-full min-h-[400px] mb-10 text-black'>
        <h1 className='text-2xl font-bold'>Debugger</h1>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <div className='flex flex-col'>
              <h2 className='text-xl font-bold'>Order</h2>
              <div className='flex flex-col'>
                <div className='flex flex-row'>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Order ID</h3>
                    <p>{order?.id}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Order Status</h3>
                    <p>{order?.status}</p>
                  </div>
                </div>

                <div className='flex flex-row'>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Payment ID</h3>
                    <p>{payment?.id}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Payment Status</h3>
                    <p>{payment?.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
