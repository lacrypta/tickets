import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";
import { useAccount, useNetwork, useSignMessage } from "wagmi";

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
  const { isRegistered } = useUser();

  const { signMessage } = useSignMessage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ValidNetworkBlock = () => {
    return isRegistered ? <MainWidget /> : <SignupWidget />;
  };

  const ConnectedBlock = () => {
    return chain?.id === 137 ? <ValidNetworkBlock /> : <InvalidNetworkWidget />;
  };

  function handleSign() {
    let message = "👉👉👉  AUTORIZO EL PAGO  👈👈👈\n";
    message += "💲 Monto: 34433.34 P\n";
    message += "#️⃣ Order: 442342\n";
    message += "🧑 Destino: 0x23424342423424234234234223\n";
    message += "\n";
    message += "🟰🟰🟰🟰🟰🟰🟰 DATA 🟰🟰🟰🟰🟰🟰🟰\n";
    message +=
      "3afs5df67sd6f75a7684ds67f87sa43afs5df67sd6f75a7684ds67f87sa43afs5df67sd6f75a7684ds67f87sa47f6a5s4dfas6574453sd4a5f34as6533sd546f3sd786f5a7s9d86fsa87df5a7";
    signMessage({
      message,
    });
  }

  return (
    <div>
      <Head>
        <title>La Crypta - Bar</title>
        <meta name='description' content='Feeless implementation for ERC20' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {!isDisconnected ? <Header /> : ""}

      <MainBlock>
        <button
          onClick={handleSign}
          style={{ display: "fixed", zIndex: 999999999 }}
        >
          TEST
        </button>
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
