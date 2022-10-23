import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { db, onSnapshot, doc, getDoc } from "../../lib/public/firebase";

import { useEffect, useState } from "react";
import { Background } from "../../components/Background";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import { HeaderLogo } from "../../components/HeaderLogo";
import { DoneWidget } from "../../components/Widgets/DoneWidget";
import useLoading from "../../hooks/useLoading";

const MainBlock = styled.main`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const getOrderByCode = async (code: string): Promise<number | undefined> => {
  console.info("Code", code);

  const codeRef = doc(db, "secret", code);

  const codeDoc = await getDoc(codeRef);

  if (!codeDoc.exists()) {
    return undefined;
  }
  return codeDoc.data().orderId;
};

const Home: NextPage = () => {
  const { setActive } = useLoading();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState<number>();
  const [order, setOrder] = useState<any | undefined>();

  const { code } = router.query;

  useEffect(() => {
    if (!code) {
      return;
    }

    getOrderByCode(code as string).then((orderId) => {
      if (!orderId) {
        alert("No hay una orden con ese código");
        router.push("/");
        return;
      }
      setOrderId(orderId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (!orderId) {
      return;
    }

    const orderRef = doc(db, "orders", String(orderId));

    const unsubscribe = onSnapshot(orderRef, {
      next: (snapshot) => {
        console.info("Order Updated!");
        console.dir(snapshot.data());

        setOrder(snapshot?.data());
        setIsLoading(false);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [orderId]);

  useEffect(() => {
    setActive(isLoading);
  }, [isLoading, setActive]);

  return (
    <div>
      <Head>
        <title>La Crypta - Bar</title>
        <meta name='description' content='Feeless implementation for ERC20' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <MainBlock>
        <Background />
        <HeaderLogo />
        {!isLoading && orderId ? (
          <DoneWidget orderId={orderId} order={order} />
        ) : (
          "Cargando..."
        )}
      </MainBlock>

      <Footer />
    </div>
  );
};

export default Home;
