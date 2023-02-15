import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { PurchaseContext } from "../../contexts/Purchase";
import Button from "../Form/Button";
import MuunSvg from "../../public/images/muun.svg";

export const WalletMain = () => {
  const { purchase } = useContext(PurchaseContext);
  const router = useRouter();
  const nextStep = useCallback(() => {
    router.push("wallet/muun");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className='text-2xl'>Bienvenido {purchase?.user.fullname}!</h2>
      <div className='flex flex-col space-y-4 pt-4'>
        <p>Vas a recibir el equivalente de $1000 en Bitcoin</p>
        <p>
          Descargá <b>Muun</b> y seguí los pasos de la App
        </p>
        <p>Volvé a esta página</p>

        <Button onClick={() => window.open("/api/download/muun")}>
          {" "}
          Descargar <MuunSvg height='48' className='mr-2' />
        </Button>

        <Button onClick={nextStep}>Ya está configurada</Button>
      </div>
    </div>
  );
};

export default WalletMain;
