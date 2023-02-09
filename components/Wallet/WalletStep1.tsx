import { useContext } from "react";
import { PurchaseContext } from "../../contexts/Purchase";

export const WalletMain = () => {
  const { purchase } = useContext(PurchaseContext);

  return (
    <div>
      <h2 className='text-2xl'>Bienvenido {purchase?.user.fullname}!</h2>
      <div className='flex flex-col space-y-4 pt-4'>
        <p>
          Para arrancar el curso necesitamos que tengas instalado <b>Muun</b>
        </p>
        <p>
          Una Billetera Virtual para poder pagar adentro de <b>La Crypta</b>
        </p>
        <p>Si no la tenes instalada tocá el siguiente botón</p>

        <p>
          Vas a recibir el equivalente a $1.000 (Pesos Argentinos) en{" "}
          <b>Bitcoin</b>
        </p>
        <p>Cuando la tengas instalada en el celu, tocá el botón</p>
      </div>
    </div>
  );
};

export default WalletMain;
