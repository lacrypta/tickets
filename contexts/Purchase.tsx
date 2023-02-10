import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
  setPurchaseId: Dispatch<SetStateAction<string | undefined>>;
}

// create Purchase context
export const PurchaseContext = createContext<PurchaseContextType>({
  isLoading: true,
  setPurchaseId: () => {},
});

interface PurchaseProviderProps {
  children: ReactNode;
}

export const PurchaseProvider = ({ children }: PurchaseProviderProps) => {
  const [purchase, setPurchase] = useLocalStorage<IPurchase | undefined>(
    "purchase",
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [purchaseId, setPurchaseId] = useState<string>();

  // Event: On Purchase change
  const onPurchaseChange = useCallback(
    async (snapshot: DocumentSnapshot<DocumentData>) => {
      const purchase = snapshot.data() as IPurchase;
      setPurchase(() => {
        isLoading && setIsLoading(false);
        if (purchase) {
          purchase.id = snapshot.id;
        }
        return purchase;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  );

  // Subscribe purchase snapshots
  const subscribePurchase = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    // get snapshot query firestore for order
    return onSnapshot(doc(db, "purchases", paymentId), onPurchaseChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Sets loading off if purchaseId is not found
    if (!purchaseId) {
      return;
    }

    setPurchase(undefined);
    subscribePurchase(purchaseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseId]);

  return (
    <PurchaseContext.Provider
      value={{
        purchase,
        isLoading,
        setPurchaseId,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};
