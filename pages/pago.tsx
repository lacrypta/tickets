import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/Form/Button";

import useLoading from "../hooks/useLoading";
import { IPaymentHook, PaymentMethod } from "../types/payment";

import MercadoPagoSvg from "../public/images/mercadopago.svg";
// import BitcoinSvg from "../public/images/bitcoin.svg";
import Price from "../components/Checkout/Price";
import useMercadoPago from "../hooks/payment/useMercadoPago";
import { useRedirectOnEmpty } from "../hooks/useRedirectOnEmpty";
import useOrder from "../hooks/useOrder";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ticketPrice = parseFloat(process.env.NEXT_PUBLIC_TICKET_PRICE || "1000");

const PaymentPage: NextPage = () => {
  const { setActive } = useLoading();
  const router = useRouter();
  const { order } = useOrder();
  const [hasMounted, setHasMounted] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const paymentHooks: { [_key in PaymentMethod]: IPaymentHook } = {
    crypto: useMercadoPago(),
    mercadopago: useMercadoPago(),
    invitation: useMercadoPago(),
  };

  useRedirectOnEmpty(["order"]);

  useEffect(() => {
    setActive(false);
    setHasMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function nextStep(method: PaymentMethod) {
    const { createPayment } = paymentHooks[method];
    await createPayment();
    router.push("/pago/" + method);
  }

  if (!hasMounted) {
    return null;
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

        <div className='flex flex-col text-center space-y-4 text-2xl'>
          <div className='text-lg text-right'>10 de Marzo, Belgrano, CABA</div>
          <Price value={ticketPrice} />
          <div>
            Entras con <b>MercadoPago</b> y te vas con <b>Bitcoin</b>
          </div>
          <div>
            La mitad se te devuelve en <b>Bitcoin</b> cuando venis
          </div>
        </div>
        <div>
          {!order?.id ? (
            <LoadingSpinner />
          ) : (
            <Button
              disabled={!order?.id}
              onClick={nextStep.bind(this, "mercadopago")}
            >
              <MercadoPagoSvg height='60%' className='mr-2' /> Reservar
            </Button>
          )}

          {/* <Button disabled={!order?.id} onClick={nextStep.bind(this, "crypto")}>
            {" "}
            <BitcoinSvg height='60%' className='mr-2' />
            Crypto
          </Button> */}
        </div>
      </Card>
    </div>
  );
};

export default PaymentPage;
