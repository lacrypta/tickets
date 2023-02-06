import { QrReader } from "react-qr-reader";

export const TicketScanner = () => {
  const onResult = (result: any, error: any) => {
    if (error) {
      return;
    }

    if (result) {
      console.info("Encontrado!");
      alert(result.text);
      console.dir(result);
    }
  };

  return (
    <div>
      <QrReader
        className='inset-0'
        constraints={{}}
        scanDelay={500}
        // style={{ width: "100%" }}
        // style={previewStyle}
        onResult={onResult}
      />
    </div>
  );
};

export default TicketScanner;
