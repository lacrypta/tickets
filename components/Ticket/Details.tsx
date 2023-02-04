import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";
import { useContext, useEffect } from "react";
import QRCode from "react-qr-code";
import { PurchaseContext } from "../../contexts/Purchase";
import useOrder from "../../hooks/useOrder";
import TextAttention from "./TextAttention";

export const Details = () => {
  const { isLoading, purchase } = useContext(PurchaseContext);
  const { clear } = useOrder();
  const router = useRouter();

  useEffect(() => {
    if (purchase) {
      if (purchase.status === "claimed") {
        console.info("****** ROUTER");
        console.dir(router);
        router.push("/wallet");
      }

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
      <h1>Entrada</h1>
      <div>Nombre : {purchase?.user.fullname}</div>
      <div>E-mail : {purchase?.user.email}</div>
      <div>Te enviamos por por mail el QR</div>
      <div className='flex justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <div className='bg-white p-2'>
            <QRCode value={document.location.href} />
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      >
        <TextAttention>Mostralo en la entrada</TextAttention>
      </motion.div>
    </>
  );
};
