import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Price from "../../components/Checkout/Price";
import Card from "../../components/common/Card";
import Button from "../../components/Form/Button";

import useOrder from "../../hooks/useOrder";
import { useRedirectOnEmpty } from "../../hooks/useRedirectOnEmpty";

import { useMercadopago } from "react-sdk-mercadopago";
import { useEffect, useState } from "react";

const PRICE = parseFloat(process.env.NEXT_PUBLIC_TICKET_PRICE || "2000");

const Home: NextPage = () => {
  const { payment } = useOrder();
  const router = useRouter();
  const mercadopago = useMercadopago.v2(
    process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,
    {
      locale: "es-AR",
    }
  );
  const [checkoutObject, setCheckoutObject] = useState<any>();
  const [mounted, setMounted] = useState(false);

  useRedirectOnEmpty(["order", "payment"]);

  // MercadoPago Checkout Pro
  useEffect(() => {
    if (payment?.preference_id && mercadopago && !mounted) {
      setMounted(true);

      const checkout = mercadopago.checkout({
        preference: {
          id: payment?.preference_id,
        },
      });

      setCheckoutObject(checkout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.preference_id, mercadopago, mounted]);

  function nextStep() {
    checkoutObject.open();
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
          <Button disabled={!payment?.preference_id} onClick={nextStep}>
            Pagar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
