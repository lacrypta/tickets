import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Card from "../../components/common/Card";

import useLoading from "../../hooks/useLoading";
import { LoadingSpinner } from "../../components/common";

const WaitingPage: NextPage = () => {
  const { setActive } = useLoading();

  //   useRedirectOnEmpty(["order"]);

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>La Crypta - Procesando</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Procesando Pago</h1>
        <p>Vas a recibir un mail cuando se procese el pago</p>
        <LoadingSpinner />
      </Card>
    </div>
  );
};

export default WaitingPage;
