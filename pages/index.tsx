import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import useLoading from "../hooks/useLoading";

const Home: NextPage = () => {
  const { setActive } = useLoading();

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

      <div
        className='rounded-md
            backdrop-blur-sm bg-white/[0.08]
            h-[30rem] mt-8 p-8
          '
      >
        Hola
      </div>
    </div>
  );
};

export default Home;
