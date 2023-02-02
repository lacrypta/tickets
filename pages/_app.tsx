import "../styles/globals.css";
export { reportWebVitals } from "next-axiom";
import type { AppProps } from "next/app";

import { LoadingProvider } from "../contexts/Loading";
import {
  Background,
  Footer,
  HeaderLogo,
  Transition,
} from "../components/common";
import { OrderProvider } from "../contexts/Order";
import { Debugger } from "../components/Debugger";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <OrderProvider>
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
      </OrderProvider>
    </LoadingProvider>
  );
}

export default MyApp;
