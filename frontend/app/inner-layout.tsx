"use client";

import { ThorinGlobalStyles, lightTheme } from "@ensdomains/thorin";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { createPublicClient, http } from "viem";
import { goerli } from "viem/chains";
import { WagmiConfig, createConfig, mainnet } from "wagmi";

const projectId = "22b0d61ef63060711f186c08ed4c1c4d";
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
const chains = [goerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
createWeb3Modal({ wagmiConfig, projectId, chains });

export const InnerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <WagmiConfig config={wagmiConfig}>
        <MetaMaskUIProvider
          sdkOptions={{
            dappMetadata: {
              name: "Demo UI React App",
            },
          }}
        >
          {children}
        </MetaMaskUIProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};
