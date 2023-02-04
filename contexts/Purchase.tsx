import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { IPurchase } from "../types/purchase";

import { onSnapshot, doc, db } from "../lib/public/firebase";
import { DocumentData, DocumentSnapshot } from "@firebase/firestore";
import useLocalStorage from "use-local-storage";

interface PurchaseContextType {
  purchase?: IPurchase;
  isLoading: boolean;
}

// create Purchase context
export const PurchaseContext = createContext<PurchaseContextType>({
  isLoading: true,
});

interface PurchaseProviderProps {
  children: ReactNode;
  purchaseId?: string;
}

export const PurchaseProvider = ({
  children,
  purchaseId,
}: PurchaseProviderProps) => {
  const [purchase, setPurchase] = useLocalStorage<IPurchase | undefined>(
    "purchase",
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Event: On Purchase change
  const onPurchaseChange = useCallback(
    async (snapshot: DocumentSnapshot<DocumentData>) => {
      const purchase = snapshot.data() as IPurchase;
      setPurchase(() => {
        isLoading && setIsLoading(false);
        purchase.id = snapshot.id;
        console.info("changed");
        return purchase;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  );

  // Subscribe purchase snapshots
  const subscribePurchase = useCallback(async (paymentId: string) => {
    console.info("subscribePurchase");
    // get snapshot query firestore for order
    return onSnapshot(doc(db, "purchases", paymentId), onPurchaseChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.info("Purchase ID", purchaseId);

    // Sets loading off if purchaseId is not found
    if (!purchaseId) {
      return;
    }

    setPurchase(undefined);

    console.info("INSIDE SECOND CALL");
    setIsSubscribed(true);
    subscribePurchase(purchaseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseId]);

  return (
    <PurchaseContext.Provider
      value={{
        purchase,
        isLoading,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};
