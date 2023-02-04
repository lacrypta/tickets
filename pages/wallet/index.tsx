import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Card from "../../components/common/Card";
import WalletMain from "../../components/Wallet/WalletMain";
import { PurchaseProvider } from "../../contexts/Purchase";

import useLoading from "../../hooks/useLoading";

const WalletPage: NextPage = () => {
  const { setActive, active } = useLoading();

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PurchaseProvider>
      <Head>
        <title>La Crypta - Pagar con MercadoPago</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Configurar Wallet</h1>
        {active ? "Cargando..." : <WalletMain />}
      </Card>
    </PurchaseProvider>
  );
};

export default WalletPage;
