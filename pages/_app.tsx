import "../styles/globals.css";
export { reportWebVitals } from "next-axiom";
import ReactGA from "react-ga";
import type { AppProps } from "next/app";

import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

import { LoadingProvider } from "../contexts/Loading";
import {
  Background,
  Footer,
  HeaderLogo,
  Transition,
} from "../components/common";
import { OrderProvider } from "../contexts/Order";
import { Debugger } from "../components/Debugger";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { QrScannerProvider } from "../contexts/QrScanner";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID as string);
  }, []);

  useEffect(() => {
    ReactGA.pageview(router.asPath);
  }, [router.asPath]);

  return (
    <LoadingProvider>
      <QrScannerProvider>
        <OrderProvider>
          <ThirdwebProvider desiredChainId={ChainId.Polygon}>
            <div className='flex justify-center relative w-full min-h-screen'>
              <Background />
              <div className='w-[42rem] mt-5 md:mt-20'>
                <HeaderLogo />
                <Transition>
                  <Component {...pageProps} />
                </Transition>
                {process.env.NEXT_PUBLIC_DEBUG === "1" ? <Debugger /> : ""}
              </div>
            </div>

            <Footer />
          </ThirdwebProvider>
        </OrderProvider>
      </QrScannerProvider>
    </LoadingProvider>
  );
}

export default MyApp;
