import { memo, useEffect, useState } from "react";
import { IOrder } from "../../types/order";
import { db, collection, onSnapshot } from "../../lib/public/firebase";
import { Tab } from "@headlessui/react";
import TabHeader from "./Users/TabHeader";
import Order from "./Users/Order";

export const UsersWidget = () => {
  const [categories, setCategories] = useState<any>({
    Pendientes: [],
    Confirmados: [],
    Cancelados: [],
  });

  useEffect(() => {
    // get orders from firebase
    onSnapshot(collection(db, "orders"), (snapshot) => {
      const orders: IOrder[] = [];
      console.info("Snapshot!!");
      console.dir(snapshot);
      snapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() } as IOrder);
        console.info("doc.data()");
        console.dir(doc.data());
      });

      setCategories({
        Pendientes: orders.filter((order) =>
          ["pending", "processing"].includes(order.status)
        ),
        Confirmados: orders.filter((order) => order.status === "completed"),
        Cancelados: orders.filter((order) => order.status === "cancelled"),
      });
    });
  }, []);

  return (
    <div>
      <Tab.Group>
        <Tab.List className='flex flex-auto w-full space-x-1 rounded-xl bg-blue-900/20 p-1'>
          {Object.keys(categories).map((category, k) => (
            <TabHeader key={k} title={category} />
          ))}
        </Tab.List>
        <Tab.Panels className='mt-5'>
          {Object.values(categories).map((orders: any, k) => (
            <Tab.Panel key={k} className='space-y-1'>
              {orders.map((order: any, k: string) => (
                <Order key={k} order={order} />
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default memo(UsersWidget);
