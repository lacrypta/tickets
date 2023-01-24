import { useEffect } from "react";
import { useRouter } from "next/router";
import useOrder from "./useOrder";

export type RedirectObject = "order" | "payment";

export const useRedirectOnEmpty = (object: RedirectObject[]) => {
  const { order, payment } = useOrder();
  const router = useRouter();
  useEffect(() => {
    console.info("Hooo yeahhh");
    if (object.includes("order") && !order) {
      console.info("Hooo yeahhh");
      router.push("/");
      return;
    }

    if (object.includes("payment") && !payment) {
      router.push("/pago");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, payment]);
};
