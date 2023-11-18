"use client";

import * as React from "react";
import { ethers } from "ethers";
import { SafeFactory, EthersAdapter, SafeAccountConfig } from "@safe-global/protocol-kit";
import { Button } from "@ensdomains/thorin";
import { CircularProgress } from "@mui/material";
import { useAccount, useNetwork, useWalletClient } from "wagmi";
import { useEthersSigner } from "@/hooks/useEthersSigner";

interface CreateSafeProps extends React.HTMLAttributes<HTMLDivElement> {
  setSafe: Function;
}

export function CreateSafe({ setSafe }: CreateSafeProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { chain } = useNetwork();
  const signer = useEthersSigner({ chainId: chain?.id });
  const { address } = useAccount();

  async function createSafe(event: React.SyntheticEvent) {
    if (!signer || !address) throw new Error("Wallet not connected");

    event.preventDefault();
    setIsLoading(true);

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });

    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapter });
    const safeAccountConfig: SafeAccountConfig = {
      owners: [address],
      threshold: 1,
    };

    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });

    const safeAddress = await safeSdkOwner1.getAddress();

    console.log("SAFE ADDRESS: ", safeAddress);
    setSafe(safeAddress);
    setIsLoading(false);
  }

  return (
    <Button onClick={createSafe} disabled={isLoading}>
      {isLoading && <CircularProgress />}
      Create safe
    </Button>
  );
}
