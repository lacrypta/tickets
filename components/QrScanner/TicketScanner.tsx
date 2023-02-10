import { AnimatePresence } from "framer-motion";
import { useCallback, useContext, useState } from "react";
import { QrReader } from "react-qr-reader";
import { QrScannerContext } from "../../contexts/QrScanner";
import { getTicketId } from "../../lib/public/utils";
import { IPurchase } from "../../types/purchase";
import CloseButton from "./CloseButton";
import ErrorMessage from "./ErrorMessage";
import TicketDetails from "./TicketDetails";

interface ITicketsProps {
  onClose: () => void;
}

export const TicketScanner = ({ onClose }: ITicketsProps) => {
  const { getPurchaseById, setPurchaseAsClaimed } =
    useContext(QrScannerContext);
  const [errorMessage, setErrorMessage] = useState();
  const [claimedTicked, setClaimedTicket] = useState<IPurchase>();

  // Event Handlers
  const onFound = useCallback(async (text: string) => {
    try {
      const id = getTicketId(text);
      if (!id) {
        throw new Error("Invalid ticket");
      }
      const purchase = await getPurchaseById(id);

      if (!purchase) {
        throw new Error("Ticket not found");
      }
      if (purchase.status !== "ready") {
        throw new Error("Ticket already claimed");
      }

      await setPurchaseAsClaimed(id);

      setClaimedTicket(purchase);
    } catch (e: any) {
      setErrorMessage(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResult = useCallback((result: any, error: any) => {
    if (error) {
      return;
    }

    if (result) {
      onFound && onFound(result.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // DOM
  return (
    <div className='fixed h-screen w-screen top-0 left-0 z-10 bg-black overflow-hidden'>
      <div className='absolute top-10 right-10 z-20'>
        <CloseButton onClick={onClose} />
      </div>
      <QrReader
        constraints={{}}
        scanDelay={300}
        videoContainerStyle={{ width: "100%", position: "static" }}
        onResult={onResult}
      />

      <AnimatePresence>
        {errorMessage ? <ErrorMessage message={errorMessage} /> : ""}
        {claimedTicked ? (
          <TicketDetails>{JSON.stringify(claimedTicked)}</TicketDetails>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketScanner;
