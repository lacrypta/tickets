import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";
import { useAccount, useNetwork } from "wagmi";

import { HeaderLogo } from "../components/HeaderLogo";
import { Footer } from "../components/Footer";
import { Background } from "../components/Background";
import Header from "../components/Header";

import DisconnectedWidget from "../components/Widgets/DisconnectedWidget";
import MainWidget from "../components/Widgets/MainWidget";
import InvalidNetworkWidget from "../components/Widgets/InvalidNetworkWidget";
import useUser from "../hooks/useUser";
import SignupWidget from "../components/Widgets/SignupWidget";
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
  const { isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const [isMounted, setIsMounted] = useState(false); // Fix Hydration trouble
  const { isRegistered, isLoading } = useUser();
  const { setActive } = useLoading();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setActive(isLoading);
  }, [isLoading, setActive]);

  const ValidNetworkBlock = () => {
    return isRegistered ? <MainWidget /> : <SignupWidget />;
  };

  const ConnectedBlock = () => {
    return chain?.id === 137 ? <ValidNetworkBlock /> : <InvalidNetworkWidget />;
  };

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
        {isMounted ? (
          isDisconnected ? (
            <DisconnectedWidget />
          ) : (
            <ConnectedBlock />
          )
        ) : (
          "Cargando..."
        )}
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
