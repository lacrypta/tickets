import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Card from "../../components/common/Card";
import Button from "../../components/Form/Button";
import { PurchaseContext, PurchaseProvider } from "../../contexts/Purchase";

import useOrder from "../../hooks/useOrder";

const Home: NextPage = () => {
  const router = useRouter();
  const { clear } = useOrder();

  function nextStep() {
    router.push("/wallet");
  }

  return (
    <PurchaseProvider purchaseId={router.query.pid as string}>
      <Head>
        <title>La Crypta - Pagado</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PurchaseContext.Consumer>
        {({ purchase, isLoading }) => {
          console.dir(purchase);
          if (!isLoading) {
            return <div>Cargando...</div>;
          }

          if (!purchase) {
            return <div>No se encontró la compra</div>;
          }

          clear(); // Clear order
          return (
            <Card>
              <h1>Pagado!</h1>
              <div>Nombre : {purchase?.user.fullname}</div>
              <div>E-mail : {purchase?.user.email}</div>
              <div>Te enviamos por por mail el QR</div>
              <div>
                <Button onClick={nextStep}>Preparar Wallet</Button>
              </div>
            </Card>
          );
        }}
      </PurchaseContext.Consumer>
    </PurchaseProvider>
  );
};

export default Home;
