import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../components/Common/Card";
import Button from "../components/Form/Button";
import Input from "../components/Form/Input";

import useLoading from "../hooks/useLoading";
import useOrder from "../hooks/useOrder";

interface FormTargetProps extends EventTarget {
  name: HTMLInputElement;
  email: HTMLInputElement;
}

const Home: NextPage = () => {
  const { setActive } = useLoading();
  const { order, createOrder } = useOrder();
  const [fullname, setFullname] = useState(order?.user.fullname);
  const [email, setEmail] = useState(order?.user.email);

  const router = useRouter();

  // On Form Submit
  function nextStep(e: React.FormEvent<HTMLFormElement>) {
    router.push("/pago", undefined, { scroll: false });

    const target = e.target as FormTargetProps;

    // TODO: Validate form data
    const userData = {
      fullname: target.name.value,
      email: target.email.value,
    };

    // Creates Order
    createOrder(userData);

    e?.preventDefault();
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

      <form onSubmit={nextStep}>
        <Card>
          <h1>Completá tus datos</h1>

          <Input
            label='Nombre Completo'
            name='name'
            placeholder='Nombre Completo'
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />

          <Input
            label='E-mail'
            name='email'
            type='email'
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className='space-y-2'></div>
          <Button type='submit'>Comprar</Button>
        </Card>
      </form>
    </div>
  );
};

export default Home;
