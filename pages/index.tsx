import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";

import { HeaderLogo } from "../components/HeaderLogo";
import { Footer } from "../components/Footer";
import { Background } from "../components/Background";
import Header from "../components/Header";

import MainWidget from "../components/Widgets/MainWidget";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";

const MainBlock = styled.main`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Home: NextPage = () => {
  const { isLoading } = useUser();
  const { setActive } = useLoading();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setActive(isLoading);
  }, [isLoading, setActive]);

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

      <Header />

      <MainBlock>
        <Background />
        <HeaderLogo />
        {isMounted ? <MainWidget /> : "Cargando..."}
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
