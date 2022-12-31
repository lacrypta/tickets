import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Card from "../../components/common/Card";

import useLoading from "../../hooks/useLoading";

const Home: NextPage = () => {
  const { setActive } = useLoading();

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>La Crypta - Pagar con MercadoPago</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Configurar Wallet</h1>
        <div>Alguna data</div>
      </Card>
    </div>
  );
};

export default Home;
