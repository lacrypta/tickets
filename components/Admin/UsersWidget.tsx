import { memo, useEffect, useState } from "react";
import { IOrder } from "../../types/order";
import { db, collection, onSnapshot } from "../../lib/public/firebase";
import { Tab } from "@headlessui/react";
import TabHeader from "./Users/TabHeader";

export const UsersWidget = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    // get orders from firebase
    onSnapshot(collection(db, "orders"), (snapshot) => {
      const orders: IOrder[] = [];
      console.info("Snapshot!!");
      console.dir(snapshot);
      snapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() } as IOrder);
        console.dir(doc);
      });

      setOrders(orders);
    });
  }, []);

  const [categories] = useState({
    Pendientes: orders,
    Confirmados: orders,
    Cancelados: orders,
  });
  return (
    <div>
      <div>{JSON.stringify(categories)}</div>
      <Tab.Group>
        <Tab.List className='flex flex-auto w-full space-x-1 rounded-xl bg-blue-900/20 p-1'>
          {Object.keys(categories).map((category, k) => (
            <TabHeader key={k} title={category} />
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.values(categories).map((orders, k) => (
            <Tab.Panel key={k}>
              {orders.map((order, k) => (
                <div key={k}>{JSON.stringify(order)}</div>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default memo(UsersWidget);
