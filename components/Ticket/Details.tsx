import { useContext, useEffect } from "react";
import { PurchaseContext } from "../../contexts/Purchase";
import useOrder from "../../hooks/useOrder";
import Button from "../Form/Button";

interface IDetailsProps {
  nextStep: () => void;
}

export const Details = ({ nextStep }: IDetailsProps) => {
  const { isLoading, purchase } = useContext(PurchaseContext);
  const { clear } = useOrder();

  useEffect(() => {
    if (purchase) {
      clear(); // Clear order
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!purchase) {
    return <div>No se encontró la compra</div>;
  }

  return (
    <>
      <h1>Pagado!</h1>
      <div>Nombre : {purchase?.user.fullname}</div>
      <div>E-mail : {purchase?.user.email}</div>
      <div>Te enviamos por por mail el QR</div>
      <div>
        <Button onClick={nextStep}>Preparar Wallet</Button>
      </div>
    </>
  );
};
