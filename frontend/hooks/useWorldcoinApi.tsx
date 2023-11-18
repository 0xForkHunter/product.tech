"use client";

import { BASE_API_URL } from "@/data/constants";
import { useMutation } from "@tanstack/react-query";

export const useVerifyWorldcoinProofApi = () => {
  return useMutation({
    mutationFn: (args: { wallet: string; proof_data: any; }) =>
      fetch(BASE_API_URL + "/worldcoin/verify_proof", {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({ wallet: args.wallet, worldcoin_proof: args.proof_data }),
      })
        .then((res) => res.json())
  });
};
