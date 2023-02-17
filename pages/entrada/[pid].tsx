import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Card from "../../components/common/Card";
import Details from "../../components/Ticket/Details";
import { PurchaseContext } from "../../contexts/Purchase";
import useLoading from "../../hooks/useLoading";

const TicketPage: NextPage = () => {
  const router = useRouter();
  const { setActive } = useLoading();
  const { setPurchaseId } = useContext(PurchaseContext);

  useEffect(() => {
    setPurchaseId(router.query.pid as string);
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>La Crypta - entrada</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Card>
        <Details />
      </Card>
    </>
  );
};

export default TicketPage;
