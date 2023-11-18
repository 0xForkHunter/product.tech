import { useRef } from "react";
import { toast } from "react-toastify";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { PRODUCT_TECH_CONTRACT } from "@/data/constants";
import { formatError } from "@/lib/utils";

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
