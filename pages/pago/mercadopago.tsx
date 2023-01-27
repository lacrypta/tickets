import { NextPage } from "next";
import Head from "next/head";
import Price from "../../components/Checkout/Price";
import Card from "../../components/common/Card";
import Button from "../../components/Form/Button";

import { useRedirectOnEmpty } from "../../hooks/useRedirectOnEmpty";

import useMercadoPago from "../../hooks/payment/useMercadoPago";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useLoading from "../../hooks/useLoading";

const PRICE = parseFloat(process.env.NEXT_PUBLIC_TICKET_PRICE || "2000");

const Home: NextPage = () => {
  const router = useRouter();
  const { preferenceId, payment, checkout, clearCheckout } = useMercadoPago();
  const [hasMounted, setHasMounted] = useState(false);
  const { setActive } = useLoading();

  useRedirectOnEmpty(["order", "payment"]);

  useEffect(() => {
    setHasMounted(true);
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStep = useCallback(() => {
    checkout && checkout();
  }, [checkout]);

  useEffect(() => {
    clearCheckout();
    payment?.status === "paid" && router.push("/pagado");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.status]);

  if (!hasMounted) {
    return null;
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
