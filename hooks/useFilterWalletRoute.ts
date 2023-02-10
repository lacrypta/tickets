import { PurchaseStatus } from "./../types/purchase";
import { PurchaseContext } from "./../contexts/Purchase";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export type RedirectObject = "order" | "payment";

interface UseFilterWalletRouteProps {
  status?: PurchaseStatus;
}

interface UseFilterWalletRouteReturn {
  isLoading: boolean;
}

export const useFilterWalletRoute = ({
  status,
}: UseFilterWalletRouteProps): UseFilterWalletRouteReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const { purchase } = useContext(PurchaseContext);
  const router = useRouter();
  useEffect(() => {
    if (!purchase) {
      return;
    }

    if (status && purchase.status === status) {
      router.push("/entrada/" + purchase.id);
      return;
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase]);

  return {
    isLoading,
  };
};

export default useFilterWalletRoute;
