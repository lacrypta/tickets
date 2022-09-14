import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ThemeProvider } from "@mui/material";

import { themeOptions } from "../styles/theme";
import { CartProvider } from "../providers/Cart";

import menuItems from "../data/menu.json";
import { StepsProvider } from "../providers/Steps";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.polygonMumbai]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "La Crypta - Menu Bar",
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
    <StepsProvider>
      <ThemeProvider theme={themeOptions}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider theme={darkTheme()} chains={chains}>
            <CartProvider menu={menuItems}>
              <Component {...pageProps} />
            </CartProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </StepsProvider>
  );
}

export default MyApp;
