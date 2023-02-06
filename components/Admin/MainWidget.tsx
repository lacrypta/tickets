import { useContext, useEffect } from "react";
import { QrScannerContext } from "../../contexts/QrScanner";
import { getAuth } from "../../lib/public/firebase";
import Button from "../Form/Button";

export const MainWidget = () => {
  const auth = getAuth();
  const qrScanner = useContext(QrScannerContext);

  const onHash = (hash: string) => {
    console.info("Hash: ", hash);
  };

  useEffect(() => {
    qrScanner.setCallback(onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    console.info("Cerrado!");
    auth.signOut();
  };

  const handleScan = () => {
    qrScanner.setActive(true);
  };

  return (
    <div>
      <Button onClick={handleLogout}>Cerrar</Button>
      <Button onClick={handleScan}>Scan</Button>
    </div>
  );
};

export default MainWidget;
