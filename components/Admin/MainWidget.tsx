import { useCallback, useContext } from "react";
import { QrScannerContext } from "../../contexts/QrScanner";
import { getAuth } from "../../lib/public/firebase";
import { ajaxCall } from "../../lib/public/request";
import Button from "../Form/Button";

export const MainWidget = () => {
  const auth = getAuth();
  const qrScanner = useContext(QrScannerContext);

  const handleLogout = useCallback(() => {
    console.info("Cerrado!");
    auth.signOut();
  }, [auth]);

  const handleScan = useCallback(() => {
    qrScanner.setActive(true);
  }, [qrScanner]);

  const handlePopulate = useCallback(async () => {
    console.info("Populating fixture...");
    const res = await ajaxCall("fixture");
    console.dir(res);
  }, []);

  return (
    <div>
      <Button onClick={handleLogout}>Cerrar</Button>
      <Button onClick={handleScan}>Scan</Button>
      {process.env.NEXT_PUBLIC_DEBUG && (
        <Button onClick={handlePopulate}>Populate Fixture</Button>
      )}
    </div>
  );
};

export default MainWidget;
