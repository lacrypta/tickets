import { QrReader } from "react-qr-reader";

export type CallbackFunction = (_hash: string) => void;
interface TicketScannerProps {
  onFound: CallbackFunction;
}

export const TicketScanner = ({ onFound }: TicketScannerProps) => {
  const onResult = (result: any, error: any) => {
    if (error) {
      return;
    }

    if (result) {
      onFound && onFound(result.text);
    }
  };

  return (
    <div className='absolute inset-0 z-10 bg-black'>
      <QrReader
        constraints={{}}
        scanDelay={500}
        videoContainerStyle={{ width: "100%", position: "static" }}
        onResult={onResult}
      />
    </div>
  );
};

export default TicketScanner;
