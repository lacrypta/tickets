import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "../../components/common/Card";
import { Details } from "../../components/Ticket/Details";
import { PurchaseProvider } from "../../contexts/Purchase";
import useLoading from "../../hooks/useLoading";

const Home: NextPage = () => {
  const router = useRouter();
  const { setActive } = useLoading();

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PurchaseProvider purchaseId={router.query.pid as string}>
      <Head>
        <title>La Crypta - Pagado</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Card>
        <Details />
      </Card>
    </PurchaseProvider>
  );
};

export default Home;
