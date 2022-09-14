import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";

import { HeaderLogo } from "../components/HeaderLogo";
import { MenuWidget } from "../components/Widgets/MenuWidget";
import { Footer } from "../components/Footer";

import { Background } from "../components/Background";
import { useContext } from "react";
import { StepsContext } from "../providers/Steps";
import { CartWidget } from "../components/Widgets/OrderWidget";
import { DoneWidget } from "../components/Widgets/DoneWidget";
import Header from "../components/Header";

const MainBlock = styled.main`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const widgetSteps = [
  <MenuWidget key='menu' />,
  <CartWidget key='cart' />,
  <DoneWidget key='done' />,
];

const Home: NextPage = () => {
  const { step } = useContext(StepsContext);

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
        {widgetSteps[step]}
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
