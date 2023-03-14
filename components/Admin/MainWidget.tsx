import { useRouter } from "next/router";
import { memo, useCallback, useContext, useState } from "react";
import { QrScannerContext } from "../../contexts/QrScanner";
import { getAuth } from "../../lib/public/firebase";
import { ajaxCall } from "../../lib/public/request";
import Button from "../Form/Button";
import LinksModal from "./MercadoPagoLinks/LinksModal";

export const MainWidget = () => {
  const router = useRouter();
  const auth = getAuth();
  const qrScanner = useContext(QrScannerContext);
  const [showLinksModal, setShowLinksModal] = useState(false);

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

  const handleAddLinks = useCallback(async () => {
    setShowLinksModal(true);
  }, []);

  const handleUsersList = useCallback(async () => {
    router.push("/admin/users");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button onClick={handleLogout}>Cerrar</Button>
      <Button onClick={handleScan}>Scan</Button>
      <Button onClick={handleUsersList}>Lista de Usuarios</Button>
      {process.env.NEXT_PUBLIC_DEBUG && (
        <>
          <Button onClick={handlePopulate}>Populate Fixture</Button>
          <Button onClick={handleAddLinks}>Agregar Links de MercadoPago</Button>

          <LinksModal
            show={showLinksModal}
            onClose={() => setShowLinksModal(false)}
          />
        </>
      )}
    </div>
  );
};

export default memo(MainWidget);
