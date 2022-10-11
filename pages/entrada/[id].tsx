import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";

import { HeaderLogo } from "../../components/HeaderLogo";
import { Footer } from "../../components/Footer";
import { Background } from "../../components/Background";

import { useEffect } from "react";
import { useRouter } from "next/router";

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

  // Ticket ID
  useEffect(() => {
    const { id } = router.query;
    if (!id) {
      return;
    }
    console.info("Request id:", id);
  }, [router]);

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
          <h1></h1>
          <h1>Tu entrada vieja!!</h1>
        </Container>
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
