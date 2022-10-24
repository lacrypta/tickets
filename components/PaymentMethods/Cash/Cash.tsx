import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { StepsContext } from "../../../contexts/Steps";
import useLoading from "../../../hooks/useLoading";
import useOrder from "../../../hooks/useOrder";
import { ajaxCall } from "../../../lib/public/request";
import BackButton from "../../BackButton";
import Button from "../../common/Button";

export const Cash = () => {
  const router = useRouter();
  const { setStep } = useContext(StepsContext);

  const { setActive } = useLoading();
  const { orderId } = useOrder();

  useEffect(() => {
    if (orderId) {
      setActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleBack = () => {
    setStep(1);
  };

  const handleConfirm = async () => {
    setActive(true);
    const res = await ajaxCall("gateway/cash/approve", {
      orderId,
    });

    if (res.success) {
      router.push("/order/" + res.data.code);
    } else {
      setActive(false);
    }
  };

  return (
    <>
      <div>
        <h2>Pago en Efectivo</h2>
      </div>

      <div>Hacé click para Confirmar tu Pedido y pagar en Caja.</div>

      <div>
        <Button onClick={handleConfirm}>Pagar en Efectivo</Button>
      </div>

      <BackButton onClick={handleBack} />
    </>
  );
};
