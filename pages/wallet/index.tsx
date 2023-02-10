import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Card from "../../components/common/Card";
import WalletStep1 from "../../components/Wallet/WalletStep1";
import useFilterWalletRoute from "../../hooks/useFilterWalletRoute";

import useLoading from "../../hooks/useLoading";

const WalletPage: NextPage = () => {
  const { setActive } = useLoading();

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading } = useFilterWalletRoute({ status: "ready" });

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
