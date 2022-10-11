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
    process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN || "",
    {
      locale: "es-AR",
    }
  );

  useEffect(() => {
    if (mercadopago && !mounted) {
      setMounted(true);

      const checkout = mercadopago.checkout({
        preference: {
          id: "1214914114-7e934c06-06de-4a35-8663-b0b9935b8b2d",
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
