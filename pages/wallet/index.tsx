import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Card from "../../components/common/Card";
import WalletStep1 from "../../components/Wallet/WalletStep1";
import { PurchaseContext } from "../../contexts/Purchase";

import useLoading from "../../hooks/useLoading";

const WalletPage: NextPage = () => {
  const { purchase } = useContext(PurchaseContext);
  const router = useRouter();
  const { setActive } = useLoading();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!purchase) {
      router.push("/");
      return;
    }

    if (purchase.status === "ready") {
      router.push("/entrada/" + purchase.id);
      return;
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase]);

  return (
    <>
      <Head>
        <title>La Crypta - Pagar con MercadoPago</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Configurar Wallet</h1>
        {isLoading ? "Cargando..." : <WalletStep1 />}
      </Card>
    </>
  );
};

export default WalletPage;
