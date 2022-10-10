import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";

import { HeaderLogo } from "../components/HeaderLogo";
import { Footer } from "../components/Footer";
import { Background } from "../components/Background";

import { useEffect, useState } from "react";
import { MainForm } from "../components/MainForm";

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
  const [isMounted, setIsMounted] = useState(false); // Fix Hydration trouble

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <Head>
        <title>La Crypta - Bar</title>
        <meta name='description' content='Feeless implementation for ERC20' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MainBlock>
        <Background />
        <Container>
          <HeaderLogo />
          {isMounted ? <MainForm /> : "Cargando..."}
        </Container>
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
