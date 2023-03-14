import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Price from "../../components/Checkout/Price";
import Card from "../../components/common/Card";
import Button from "../../components/Form/Button";
import useBank from "../../hooks/payment/useBankAccount";

import useLoading from "../../hooks/useLoading";
import { useRedirectOnEmpty } from "../../hooks/useRedirectOnEmpty";

import whatsAppImage from "../../public/images/whatsapp.png";

const PRICE = parseFloat(process.env.NEXT_PUBLIC_TICKET_PRICE || "2000");

const BankPage: NextPage = () => {
  const { setActive } = useLoading();
  const { order } = useBank();

  useRedirectOnEmpty(["order", "payment"]);

  const openWhatsApp = () => {
    const phone = "541131080456";
    const message = encodeURIComponent(`Nombre : *${order?.user.fullname}*.
E-mail : *${order?.user.email}*.
Envío la captura de la transacción.`);

    window.open(
      `https://api.whatsapp.com/send/?phone=%2B${phone}&text=${message}&type=phone_number&app_absent=0`
    );
  };

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>La Crypta - Pagar por Banco</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Crypto</h1>
        <Price value={PRICE} />

        <ol>
          <li>1. Realizá la transferencia bancaria por CBU o Alias</li>
          <li>
            2. Enviá el comprobante por <b>Whatsapp</b>
          </li>
        </ol>

        <div>
          <b>Alias:</b> LA.CRYPTA
        </div>
        <div>
          <b>CBU:</b> 0000168300000000702647
        </div>
        <div>
          <Button onClick={openWhatsApp}>
            <img
              src={whatsAppImage.src}
              height='20'
              width='20'
              alt='Whatsapp'
              className='mr-2'
            />
            Enviar Comprobante
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BankPage;
