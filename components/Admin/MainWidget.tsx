import { useContext } from "react";
import { QrScannerContext } from "../../contexts/QrScanner";
import { getAuth } from "../../lib/public/firebase";
import { ajaxCall } from "../../lib/public/request";
import Button from "../Form/Button";

export const MainWidget = () => {
  const auth = getAuth();
  const qrScanner = useContext(QrScannerContext);

  const handleLogout = () => {
    console.info("Cerrado!");
    auth.signOut();
  };

  const handleScan = () => {
    qrScanner.setActive(true);
  };

  const handlePopulate = async () => {
    console.info("Populating fixture...");
    const res = await ajaxCall("fixture");
    console.dir(res);
  };

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
