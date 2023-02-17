import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Card from "../../components/Common/Card";
import WalletMain from "../../components/Wallet/WalletMain";
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
        <title>La Crypta - Instalar Muun</title>
        <meta name='description' content='La Crypta - Instalar Muun' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Configurar Wallet</h1>
        {isLoading ? "Cargando..." : <WalletMain />}
      </Card>
    </>
  );
};

export default WalletPage;
