import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "../components/common/Card";
import Button from "../components/Form/Button";
import Input from "../components/Form/Input";

import useLoading from "../hooks/useLoading";

const Home: NextPage = () => {
  const { setActive } = useLoading();
  const router = useRouter();

  function nextStep() {
    router.push("/pago", undefined, { scroll: false });
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
        <h1>Completá tus datos</h1>
        <Input
          label='Nombre Completo'
          name='name'
          placeholder='Nombre Completo'
        />
        <Input label='E-mail' name='email' type='email' placeholder='E-mail' />

        <div className='space-y-2'></div>
        <Button
          onClick={() => {
            nextStep();
          }}
        >
          Comprar
        </Button>
      </Card>
    </div>
  );
};

export default Home;
