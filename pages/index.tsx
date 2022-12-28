import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "../components/common/Card";
import Button from "../components/Form/Button";

import useLoading from "../hooks/useLoading";

const Home: NextPage = () => {
  const { setActive } = useLoading();
  const router = useRouter();

  function nextStep() {
    setTimeout(() => {
      router.push("/pago", undefined, { scroll: false });
    }, 350);
  }

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>La Crypta - Entradas</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Formulario</h1>
        <div>
          Nombre: <input type='text' />
        </div>
        <div>
          E-mail <input type='text' />
        </div>
        <div>
          <Button
            onClick={() => {
              nextStep();
            }}
          >
            Comprar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
