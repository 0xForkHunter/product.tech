"use client";

import { ThorinGlobalStyles, lightTheme } from "@ensdomains/thorin";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { celoAlfajores, goerli } from "viem/chains";
import { WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";
import { CssVarsProvider } from "@mui/joy/styles";
import "react-toastify/dist/ReactToastify.css";

const projectId = "22b0d61ef63060711f186c08ed4c1c4d";
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
const chains = [celoAlfajores];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: "light" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export const InnerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        theme={{
          ...lightTheme,
          colors: {
            ...lightTheme.colors,
            // accentDim: "#ff6154",
            // accentSurface: "#ff6154",
            // textAccent: "#ff6154",
            // accentPrimary: "#ff6154",
            // accent: "#ff6154",
            // accentLight: "#ff6154",
            // textPrimary: "#ff6154",
            // accentActive: "#ff6154",
            // accentBright: "#ff6154",
          },
        }}
      >
        <ThorinGlobalStyles />
        <ToastContainer />
        <WagmiConfig config={wagmiConfig}>
          {/*<MetaMaskUIProvider
              sdkOptions={{
                dappMetadata: {
                  name: "Demo UI React App",
                },
              }}
            > */}
          {children}
          {/* </MetaMaskUIProvider> */}
        </WagmiConfig>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
