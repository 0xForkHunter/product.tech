"use client";

import { Typography } from "@ensdomains/thorin";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography fontVariant="headingOne">Welcome to Product.tech</Typography>
      <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
      <w3m-button />
    </main>
  );
}
