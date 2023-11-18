"use client";

import * as React from "react";
import { ethers } from "ethers";
import { SafeFactory, EthersAdapter, SafeAccountConfig } from "@safe-global/protocol-kit";
import { Button } from "@ensdomains/thorin";
import { CircularProgress } from "@mui/material";
import {  useNetwork } from "wagmi";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { PRODUCT_TECH_ADDRESS } from "@/data/constants";

export const useCreateSafe = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { chain } = useNetwork();
  const signer = useEthersSigner({ chainId: chain?.id });

  async function createSafe() {
    if (!signer) throw new Error("Wallet not connected");

    setIsLoading(true);

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });

    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapter });
    const safeAccountConfig: SafeAccountConfig = {
      owners: [PRODUCT_TECH_ADDRESS],
      threshold: 1,
    };

    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });

    const safeAddress = await safeSdkOwner1.getAddress();

    console.log("SAFE ADDRESS: ", safeAddress);
    setIsLoading(false);
    return safeAddress;
  }

  return { isLoading, createSafe };
};
