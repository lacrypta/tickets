import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import TicketScanner from "../components/QrScanner/TicketScanner";

import type { CallbackFunction } from "../components/QrScanner/TicketScanner";

export interface QrScannerContextType {
  isLoading: boolean;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  setCallback: Dispatch<SetStateAction<CallbackFunction>>;
}

export const QrScannerContext = createContext<QrScannerContextType>({
  isLoading: true,
  active: false,
  setActive: () => {},
  setCallback: () => {},
});

export interface QrScannerProviderProps {
  children: ReactNode;
}

export const QrScannerProvider = ({ children }: QrScannerProviderProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [callback, setCallback] = useState<CallbackFunction>(() => {});
  return (
    <QrScannerContext.Provider
      value={{
        isLoading: true,
        active,
        setActive,
        setCallback,
      }}
    >
      <>
        {active && <TicketScanner onFound={callback} />}
        {children}
      </>
    </QrScannerContext.Provider>
  );
};
