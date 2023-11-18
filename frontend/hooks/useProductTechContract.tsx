import { useRef } from "react";
import { toast } from "react-toastify";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { PRODUCT_TECH_CONTRACT } from "@/data/constants";
import { formatError } from "@/lib/utils";

const TRADE_DATA = {
  sell: {
    functionName: "sellKeys",
    successMsg: "You sold a key !",
  },
  buy: {
    functionName: "buyKey",
    successMsg: "You bought a key !",
  },
} as const;

export const useCreateProduct = (onSuccess?: () => void) => {
  const toastId = useRef<string | number | undefined>(undefined);

  const {
    data: tx,
    writeAsync,
    isLoading,
  } = useContractWrite({
    ...PRODUCT_TECH_CONTRACT,
    functionName: "createProduct",
    onSuccess: () => {
      toastId.current = toast("Transaction submitted!", { isLoading: true });
    },
    onError: (err: any) => {
      if (err?.shortMessage !== "User rejected the request.") {
        toast.error("There was an error processing your transaction: " + formatError(err));
      }
    },
  });

  const { isLoading: txProcessing } = useWaitForTransaction({
    hash: tx?.hash,
    onSuccess: () => {
      toast.update(toastId.current!, {
        render: "Product created successfully",
        isLoading: false,
        type: "success",
        autoClose: 3000,
      });
      onSuccess && onSuccess();
    },
  });

  return { isLoading: isLoading || txProcessing, executeTx: writeAsync };
};

export const useGetProductData = (slug: string) => {
  const {
    data: buyPriceAfterFee,
    isLoading: isLoadingBuyPriceWithFees,
    refetch: refetchBuyPriceAfterFee,
  } = useContractRead({
    ...PRODUCT_TECH_CONTRACT,
    functionName: "getBuyPriceAfterFee",
    args: [slug, BigInt(1)],
    enabled: !!slug,
  });

  const {
    data: buyPrice,
    isLoading: isLoadingBuyPrice,
    refetch: refetchBuyPrice,
  } = useContractRead({
    ...PRODUCT_TECH_CONTRACT,
    functionName: "getBuyPrice",
    args: [slug, BigInt(1)],
    enabled: !!slug,
  });

  const {
    data: sellPrice,
    refetch: refetchSellprice,
    isLoading: isLoadingSellPrice,
  } = useContractRead({
    ...PRODUCT_TECH_CONTRACT,
    functionName: "getSellPrice",
    args: [slug, BigInt(1)],
    enabled: !!slug,
  });

  const refetch = () => {
    refetchSellprice();
    refetchBuyPrice();
    refetchBuyPriceAfterFee();
  };

  return {
    sellPrice,
    buyPrice,
    buyPriceAfterFee,
    isLoading: isLoadingBuyPrice || isLoadingSellPrice || isLoadingBuyPriceWithFees,
    refetch,
  };
};

export const useTradeKey = (side: "buy" | "sell", successFn?: () => void) => {
  const toastId = useRef<string | number | undefined>(undefined);

  const {
    data: tx,
    writeAsync,
    isLoading,
  } = useContractWrite({
    ...PRODUCT_TECH_CONTRACT,
    functionName: TRADE_DATA[side].functionName,
    onSuccess: () => {
      toastId.current = toast("Transaction submitted!", { isLoading: true });
    },
    onError: (err: any) => {
      if (err?.shortMessage !== "User rejected the request.") {
        toast.error("There was an error processing your transaction: " + formatError(err));
      }
    },
  });

  const { isLoading: txProcessing } = useWaitForTransaction({
    hash: tx?.hash,
    onSuccess: () => {
      toast.update(toastId.current!, {
        render: TRADE_DATA[side].successMsg,
        isLoading: false,
        type: "success",
        autoClose: 3000,
      });
      successFn && successFn();
    },
  });

  return { isLoading: isLoading || txProcessing, executeTx: writeAsync };
};
