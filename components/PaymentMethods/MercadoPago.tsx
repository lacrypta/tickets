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

      const checkout = mercadopago.checkout({
        preference: {
          id: "220859620-164ceb81-ff4b-4db6-90cf-7a312c449fe8",
        },

        callbacks: {
          onSubmit: (algo: any) => {
            console.dir(algo);
          },
          onReady: () => {
            console.info("onReady!!");
            // handle form ready
          },
          onError: (error: any) => {
            console.dir(error);
            // handle error
          },
        },
      });

      console.info("Checkout: ");
      console.dir(checkout);
      checkout.render({
        container: "#mercadopago-container",
        label: "Pagar",
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
