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
  purchaseId: string;
}

export const PurchaseProvider = ({
  children,
  purchaseId,
}: PurchaseProviderProps) => {
  const [purchase, setPurchase] = useState<IPurchase | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Event: On Purchase change
  const onPurchaseChange = useCallback(
    async (snapshot: DocumentSnapshot<DocumentData>) => {
      !isLoading && setIsLoading(true);
      const purchase = snapshot.data() as IPurchase;
      setPurchase(purchase);
    },
    [isLoading]
  );

  // Subscribe purchase snapshots
  const subscribePurchase = useCallback(async (paymentId: string) => {
    // get snapshot query firestore for order
    return onSnapshot(doc(db, "purchases", paymentId), onPurchaseChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.info("Purchase ID", purchaseId);

    // Sets loading off if purchaseId is not found
    if (!purchaseId) {
      setIsLoading(false);
      return;
    }

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
