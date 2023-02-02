import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Price from "../../components/Checkout/Price";
import Card from "../../components/common/Card";
import Button from "../../components/Form/Button";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";

import useLoading from "../../hooks/useLoading";
import { useRedirectOnEmpty } from "../../hooks/useRedirectOnEmpty";
import CryptoModal from "../../components/Crypto/CryptoModal";

const Home: NextPage = () => {
  const { setActive } = useLoading();
  const router = useRouter();
  const address = useAddress();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  useRedirectOnEmpty(["order", "payment"]);

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function nextStep() {
    router.push("/pagado");
  }

  return (
    <div>
      <Head>
        <title>La Crypta - Pagar con Crypto</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Crypto</h1>
        <Price value={1000} />
        {!address ? (
          <div>
            <ConnectWallet />
          </div>
        ) : (
          <div>
            <div>
              <CryptoModal isOpen={isOpen} onClose={onClose} />
              <Button onClick={() => setIsOpen(true)}>Pagar</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Home;
