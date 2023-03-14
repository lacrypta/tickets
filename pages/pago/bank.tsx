import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Price from "../../components/Checkout/Price";
import Card from "../../components/common/Card";

import useLoading from "../../hooks/useLoading";
import { useRedirectOnEmpty } from "../../hooks/useRedirectOnEmpty";

const BankPage: NextPage = () => {
  const { setActive } = useLoading();

  useRedirectOnEmpty(["order", "payment"]);

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>La Crypta - Pagar por Banco</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Crypto</h1>
        <Price value={1000} />
        Bancooo
      </Card>
    </div>
  );
};

export default BankPage;
