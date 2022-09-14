import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";
import { Chain, useAccount, useNetwork } from "wagmi";

import { HeaderLogo } from "../components/HeaderLogo";
import { Footer } from "../components/Footer";
import { Background } from "../components/Background";
import Header from "../components/Header";

import DisconnectedWidget from "../components/Widgets/DisconnectedWidget";
import MainWidget from "../components/Widgets/MainWidget";

const MainBlock = styled.main`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const isPolygonChain = (chain?: Chain) => {
  return chain?.id === 137;
};

const Home: NextPage = () => {
  const { isDisconnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <div>
      <Head>
        <title>La Crypta - Bar</title>
        <meta name='description' content='Feeless implementation for ERC20' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {!isDisconnected ? <Header /> : ""}

      <MainBlock>
        <Background />
        <HeaderLogo />
        {isDisconnected ? <DisconnectedWidget /> : <MainWidget />}
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
