import { getAuth } from "../../lib/public/firebase";
import Button from "../Form/Button";
import TicketScanner from "./TicketScanner";

export const MainWidget = () => {
  const auth = getAuth();

  const handleLogout = () => {
    console.info("Cerrado!");
    auth.signOut();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Cerrar</Button>
      <TicketScanner />
    </div>
  );
};

export default MainWidget;
