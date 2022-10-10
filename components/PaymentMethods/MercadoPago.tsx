import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useMercadopago } from "react-sdk-mercadopago";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

export const MercadoPago = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const mercadopago = useMercadopago.v2(
    "TEST-0218a410-c8cf-42d7-8430-bcfb8e38b094",
    {
      locale: "es-AR",
    }
  );

  useEffect(() => {
    if (mercadopago && !mounted) {
      setMounted(true);
      mercadopago.checkout({
        preference: {
          id: "770826081-6174eaec-958a-495c-9ce5-02279182527c",
        },
        render: {
          container: "#mercadopago-container",
          label: "Pagar",
        },
      });
    }
  }, [mercadopago, mounted]);

  return (
    <Container>
      <h1>MercadoPago Bitch!</h1>
      <div id='mercadopago-container' />
    </Container>
  );
};
