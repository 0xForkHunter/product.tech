"use client";

import * as React from "react";
import { ethers } from "ethers";
import { SafeFactory, EthersAdapter, SafeAccountConfig } from "@safe-global/protocol-kit";
import { Button } from "@ensdomains/thorin";
import { CircularProgress } from "@mui/material";
import { useNetwork } from "wagmi";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { PRODUCT_TECH_ADDRESS } from "@/data/constants";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

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

    //There seems to be a bug in the protocol that prevents creating multiple safes for the same owner address.
    //We generate a new address to circumvent this issue for the sake of the demo.
    //The owner address should normally be the contract

    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

    const safeAccountConfig: SafeAccountConfig = {
      owners: [account.address],
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
