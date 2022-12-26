import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Card from "../components/common/Card";

import useLoading from "../hooks/useLoading";

const Home: NextPage = () => {
  const { setActive } = useLoading();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setActive(false);
    setShow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function nextStep() {
    setShow(false);
  }

  return (
    <div>
      <Head>
        <title>La Crypta - Pago</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card show={show}>
        <h1>Métodos de Pago</h1>
        <div>
          <button
            onClick={() => {
              nextStep();
            }}
            className='bg-red-500 text-white rounded-md px-4 py-2'
          >
            Next!
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
