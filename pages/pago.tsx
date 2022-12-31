import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "../components/common/Card";
import Button from "../components/Form/Button";

import useLoading from "../hooks/useLoading";
import { PaymentMethod } from "../types/order";

const Home: NextPage = () => {
  const { setActive } = useLoading();
  const router = useRouter();

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function nextStep(method: PaymentMethod) {
    router.push("/pago/" + method);
  }

  return (
    <div>
      <Head>
        <title>La Crypta - Pago</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Métodos de Pago</h1>
        <div>Precio : $1000</div>
        <div>
          <Button onClick={nextStep.bind(this, "mercadopago")}>
            MercadoPago
          </Button>
          <Button onClick={nextStep.bind(this, "crypto")}>Crypto</Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
