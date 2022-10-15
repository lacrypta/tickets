import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";

import { HeaderLogo } from "../../components/HeaderLogo";
import { Footer } from "../../components/Footer";
import { Background } from "../../components/Background";

import { useEffect } from "react";
import { useRouter } from "next/router";
import useOrder from "../../hooks/useOrder";
import TicketReady from "../../components/Ticket/TicketReady";
import useLoading from "../../hooks/useLoading";
import EventDetails from "../../components/EventDetails";

const MainBlock = styled.main`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 40vw;
  z-index: 10;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const { order, setOrderId, isError, error } = useOrder();
  const { setActive } = useLoading();

  // Ticket ID
  useEffect(() => {
    const { id } = router.query;
    if (!id) {
      return;
    }
    setOrderId(String(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Remove loading
  useEffect(() => {
    if (order) {
      setActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <div>
      <Head>
        <title>La Crypta - Tu entrada</title>
        <meta name='description' content='Feeless implementation for ERC20' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MainBlock>
        <Background />
        <Container>
          <HeaderLogo />
          <EventDetails />
          {!order ? (
            !isError ? (
              "Cargando...."
            ) : (
              "Error : " + error
            )
          ) : (
            <TicketReady />
          )}
        </Container>
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
