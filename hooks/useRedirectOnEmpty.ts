import { useEffect } from "react";
import { useRouter } from "next/router";
import useOrder from "./useOrder";

export type RedirectObject = "order" | "payment";

export const useRedirectOnEmpty = (object: RedirectObject[]) => {
  const { order, payment } = useOrder();
  const router = useRouter();
  useEffect(() => {
    if (object.includes("order") && !order) {
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
