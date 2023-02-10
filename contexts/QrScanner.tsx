import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import TicketScanner from "../components/QrScanner/TicketScanner";
import { getDoc, db, doc, updateDoc } from "../lib/public/firebase";
import { IPurchase } from "../types/purchase";

export interface QrScannerContextType {
  isLoading: boolean;
  active: boolean;
  getPurchaseById: (_purchaseId: string) => Promise<IPurchase | undefined>;
  setPurchaseAsClaimed: (_purchaseId: string) => Promise<void>;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const QrScannerContext = createContext<QrScannerContextType>({
  isLoading: true,
  active: false,
  setPurchaseAsClaimed: async () => {},
  getPurchaseById: async () => undefined,
  setActive: () => {},
});

export interface QrScannerProviderProps {
  children: ReactNode;
}

export const QrScannerProvider = ({ children }: QrScannerProviderProps) => {
  const [active, setActive] = useState<boolean>(false);

  // Get purchase by ID
  const getPurchaseById = useCallback(
    async (purchaseId: string): Promise<IPurchase | undefined> => {
      const purchaseRef = doc(db, "purchases", purchaseId);
      const purchase = await getDoc(purchaseRef);
      if (!purchase) {
        return;
      }
      return { id: purchase.id, ...purchase.data() } as IPurchase;
    },
    []
  );

  // Sets purchase as claimed
  const setPurchaseAsClaimed = useCallback(
    async (purchaseId: string): Promise<void> => {
      const purchaseRef = doc(db, "purchases", purchaseId);
      return await updateDoc(purchaseRef, {
        status: "claimed",
      });
    },
    []
  );
  const onClose = useCallback(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "initial";
  }, [active]);

  return (
    <QrScannerContext.Provider
      value={{
        isLoading: true,
        active,
        setPurchaseAsClaimed,
        getPurchaseById,
        setActive,
      }}
    >
      <>
        {active && <TicketScanner onClose={onClose} />}
        {children}
      </>
    </QrScannerContext.Provider>
  );
};
