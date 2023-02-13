import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { PurchaseContext } from "../../contexts/Purchase";
import Button from "../Form/Button";
import MuunSvg from "../../public/images/muun.svg";
import { IPurchase } from "../../types/purchase";

export const WalletClaim = () => {
  const { purchase } = useContext(PurchaseContext);
  const sats = 4324234;
  const router = useRouter();
  const claim = useCallback(() => {
    router.push("lightning://" + (purchase as IPurchase).lnUrlw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase]);

  return (
    <div>
      <h2 className='text-2xl'>Listo para recibir?</h2>
      <div className='flex flex-col space-y-4 pt-4'>
        <p>El total es de {sats} satoshis</p>
        <p>{sats} sats = ARS 1.000</p>
        <p>
          Hacé click en el botón y seleccióna <b>Muun</b>
        </p>

        <Button disabled={!purchase?.lnUrlw} onClick={claim}>
          {" "}
          Recibir a <MuunSvg height='48' className='mr-2' />
        </Button>
      </div>
    </div>
  );
};

export default WalletClaim;
