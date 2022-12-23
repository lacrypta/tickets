import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
export { reportWebVitals } from "next-axiom";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { LoadingProvider } from "../contexts/Loading";
import { Background, Footer, HeaderLogo } from "../components/common";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.polygonMumbai]
      : []),
  ],
  [
    // alchemyProvider({
    //   // This is Alchemy's default API key.
    //   // You can get your own at https://dashboard.alchemyapi.io
    //   apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    // }),
    // publicProvider(),
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_RPC_ADDRESS || `http://127.0.0.1:8545/`,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "La Crypta - Entradas",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          modalSize='compact'
          theme={darkTheme()}
          chains={chains}
        >
          <div className='overflow-hidden w-full h-screen flex justify-center'>
            <Background />
            <div className='w-[42rem] mt-5 p-5 md:mt-20'>
              <HeaderLogo />
              <Component {...pageProps} />
            </div>
          </div>

          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </LoadingProvider>
  );
}

export default MyApp;
