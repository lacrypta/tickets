import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoginWidget from "../../components/Admin/LoginWidget";
import MainWidget from "../../components/Admin/MainWidget";
import Card from "../../components/common/Card";

import useLoading from "../../hooks/useLoading";
import { getAuth, onAuthStateChanged } from "../../lib/public/firebase";

const AdminPage: NextPage = () => {
  const { setActive } = useLoading();

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

  useEffect(() => {
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>La Crypta - Admin</title>
        <meta name='description' content='Entradas de La Crypta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Card>
        <h1>Admin</h1>

        {isLogged ? <MainWidget /> : <LoginWidget />}
      </Card>
    </>
  );
};

export default AdminPage;
