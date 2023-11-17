"use client";

import { Flex } from "@/components/flex";
import { Typography } from "@ensdomains/thorin";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, status, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    router.replace("/app");
  }, [isConnected, router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography className="text-center" fontVariant="headingOne">
        Product.tech
      </Typography>

      <Flex y xc gap2>
        <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
        <w3m-button />
        <Typography fontVariant="label">Connect using your favorite wallet provider</Typography>
      </Flex>
      <div />
    </main>
  );
}
