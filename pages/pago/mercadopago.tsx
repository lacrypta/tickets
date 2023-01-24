import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Price from "../../components/Checkout/Price";
import Card from "../../components/common/Card";
import Button from "../../components/Form/Button";

import useOrder from "../../hooks/useOrder";
import { useRedirectOnEmpty } from "../../hooks/useRedirectOnEmpty";

const PRICE = parseFloat(process.env.NEXT_PUBLIC_TICKET_PRICE || "2000");

const Home: NextPage = () => {
  const { payment } = useOrder();
  const router = useRouter();

  useRedirectOnEmpty(["order", "payment"]);

  function nextStep() {
    router.push("/pagado");
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
          <Button disabled={!payment?.preference_id} onClick={nextStep}>
            Pagar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
