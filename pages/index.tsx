import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";

import { HeaderLogo } from "../components/HeaderLogo";
import { Footer } from "../components/Footer";
import { Background } from "../components/Background";

import { ReactElement, useContext, useEffect, useState } from "react";
import { MainForm } from "../components/Steps/MainForm";
import { StepsContext } from "../contexts/Steps";
import { Checkout } from "../components/Steps/Checkout";
import { useRouter } from "next/router";

import useLoading from "../hooks/useLoading";
import EventDetails from "../components/EventDetails";

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
  width: 90vw;
  max-width: 700px;
  z-index: 10;
`;

const stepsComponents: ReactElement<any, any>[] = [
  <MainForm key='main' />,
  <Checkout key='checkout' />,
];

const Home: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false); // Fix Hydration trouble
  const { step, setStep } = useContext(StepsContext);
  const { setActive } = useLoading();

  const router = useRouter();

  useEffect(() => {
    switch (router.asPath) {
      case "/":
        setStep(0);
        break;
      case "/#payment":
        setStep(1);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    setIsMounted(true);
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>La Crypta - Entradas</title>
        <meta name='description' content='Feeless implementation for ERC20' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MainBlock>
        <Background />
        <Container>
          <HeaderLogo />
          <EventDetails />
          {isMounted ? stepsComponents[step] : "Cargando..."}
        </Container>
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
