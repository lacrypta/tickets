import { NextPage } from "next";
import Head from "next/head";
import Price from "../../components/Checkout/Price";
import Card from "../../components/common/Card";
import Button from "../../components/Form/Button";

import {
  RedirectObject,
  useRedirectOnEmpty,
} from "../../hooks/useRedirectOnEmpty";

import useMercadoPago from "../../hooks/payment/useMercadoPago";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useLoading from "../../hooks/useLoading";
import useOrder from "../../hooks/useOrder";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const PRICE = parseFloat(process.env.NEXT_PUBLIC_TICKET_PRICE || "2000");

const MercadoPagoPage: NextPage = () => {
  const router = useRouter();
  const { preferenceId, link, checkout, clearCheckout } = useMercadoPago();
  const { order } = useOrder();
  const [hasMounted, setHasMounted] = useState(false);
  const { setActive } = useLoading();

  const [redirectOn, setRedirectOn] = useState<RedirectObject[]>([
    "order",
    "payment",
  ]);
  useRedirectOnEmpty(redirectOn);

  useEffect(() => {
    setHasMounted(true);
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStep = useCallback(
    (purchaseId: string) => {
      clearCheckout();
      setRedirectOn([]); // Prevents redirect while clearing order and payment
      router.push("/entrada/" + purchaseId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clearCheckout]
  );

  const initPayment = useCallback(() => {
    if (link) {
      router.push(link);
    } else {
      checkout && checkout();
    }
  }, [checkout, link, router]);

  useEffect(() => {
    if (order?.status !== "completed" && !order?.purchaseId) {
      return;
    }
    nextStep(order?.purchaseId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.purchaseId]);

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
          {!preferenceId ? (
            <LoadingSpinner />
          ) : (
            <>
              <Button disabled={!preferenceId} onClick={initPayment}>
                Pagar
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MercadoPagoPage;
