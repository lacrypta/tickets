import { NextPage } from "next";
import Head from "next/head";

// Hooks
// import useLoading from "../hooks/useLoading";

import { Background, HeaderLogo, Footer } from "../components/common";

const Home: NextPage = () => {
  // const { setActive } = useLoading();

  return (
    <div>
      <Head>
        <title>La Crypta - Entradas</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='overflow-hidden w-full h-screen flex justify-center'>
        <Background />
        <div className='w-[42rem] mt-20'>
          <HeaderLogo />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
