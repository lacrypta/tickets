import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../components/common/Card";

import useLoading from "../hooks/useLoading";

const Home: NextPage = () => {
  const { setActive } = useLoading();
  const router = useRouter();

  const [show, setShow] = useState(false);

  function nextStep() {
    setShow(false);
    setTimeout(() => {
      router.push("/pago");
    }, 350);
  }

  useEffect(() => {
    setActive(false);
    setShow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>La Crypta - Entradas</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card show={show}>
        <h1>Formulario</h1>
        <div>
          Nombre: <input type='text' />
        </div>
        <div>
          E-mail <input type='text' />
        </div>
        <div>
          <button
            onClick={() => {
              nextStep();
            }}
            className='bg-red-500 text-white rounded-md px-4 py-2 w-full'
          >
            Comprar
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
