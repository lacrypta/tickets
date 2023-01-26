import { NextPage } from "next";
import Head from "next/head";
import Price from "../../components/Checkout/Price";
import Card from "../../components/common/Card";
import Button from "../../components/Form/Button";

import { useRedirectOnEmpty } from "../../hooks/useRedirectOnEmpty";

import useMercadoPago from "../../hooks/payment/useMercadoPago";

const PRICE = parseFloat(process.env.NEXT_PUBLIC_TICKET_PRICE || "2000");

const Home: NextPage = () => {
  const { preferenceId, checkout } = useMercadoPago();

  useRedirectOnEmpty(["order", "payment"]);

  function nextStep() {
    console.info("ENTRANDO!!");
    checkout && checkout();
    // router.push("/pagado");
  }

  return (
    <div>
      <Head>
        <title>La Crypta - Pagar con MercadoPago</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>MercadoPago</h1>
        <Price value={PRICE} />

        <div>
          <Button disabled={!preferenceId} onClick={nextStep}>
            Pagar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
