import styled from "@emotion/styled";
import { AppBar, Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import Head from "next/head";
import { HeaderLogo } from "../components/HeaderLogo";

import { MenuWidget } from "../components/Menu/MenuWidget";

import { Footer } from "../components/Footer";

import menuItems from "../data/menu.json";

const TopBar = styled(AppBar)`
  flex-direction: row-reverse;
  padding: 0.6em;
`;

const MainBlock = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: black;
`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>La Crypta - Bar</title>
        <meta name='description' content='Feeless implementation for ERC20' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box sx={{ flexGrow: 1 }}>
        <TopBar position='static' elevation={0}>
          <ConnectButton label='Conectar Wallet' />
        </TopBar>
      </Box>

      <MainBlock>
        <HeaderLogo />
        <MenuWidget menuItems={menuItems} />
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
