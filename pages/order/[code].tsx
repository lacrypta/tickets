import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { Background } from "../../components/Background";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import { HeaderLogo } from "../../components/HeaderLogo";
import { DoneWidget } from "../../components/Widgets/DoneWidget";
import useLoading from "../../hooks/useLoading";
import useUser from "../../hooks/useUser";

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
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { code } = router.query;
  console.info("Router!");
  console.dir({ code });
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
        {isMounted ? <DoneWidget /> : "Cargando..."}
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
