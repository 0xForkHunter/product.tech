import { useTradeKey } from "@/hooks/useProductTechContract";
import { formatToDisplayString } from "@/lib/utils";
import { Close } from "@mui/icons-material";
import { DialogTitle, IconButton, Modal, ModalDialog, Typography } from "@mui/joy";
import { FC, useMemo } from "react";
import { toast } from "react-toastify";
import { useAccount, useBalance } from "wagmi";
import { Flex } from "./flex";
import { Button } from "@ensdomains/thorin";

interface Props {
  hasKeys: boolean;
  close: () => void;
  sellPrice?: bigint;
  buyPriceWithFees?: bigint;
  supporterKeysCount?: number;
  side: "buy" | "sell";
  slug: string;
}

export const TradeKeyModal: FC<Props> = ({
  hasKeys,
  close,
  sellPrice,
  supporterKeysCount,
  buyPriceWithFees,
  side,
  slug,
}) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const tx = useTradeKey(side, () => close());

  const handleBuy = () => {
    if (buyPriceWithFees === undefined || balance === undefined) return;

    if (buyPriceWithFees > balance.value) {
      toast.error(
        `Insufficient balance. You have: ${formatToDisplayString(
          balance.value,
          18
        )} ETH. You need: ${formatToDisplayString(buyPriceWithFees, 18)} ETH`
      );
      return;
    }

    tx.executeTx({ args: [slug!], value: buyPriceWithFees });
  };

  const handleSell = () => {
    tx.executeTx({ args: [slug!] });
  };

  const hasEnoughBalance = useMemo(() => {
    if (side === "sell") return true;
    if (!balance) return false;
    if (!buyPriceWithFees) return true;

    return (balance.value || BigInt(0)) >= buyPriceWithFees;
  }, [side, balance, buyPriceWithFees]);

  const enableTradeButton = () => {
    if (side === "sell") return true;
    if (buyPriceWithFees === undefined) return false;

    return hasEnoughBalance;
  };

  return (
    <Modal open={true} onClose={close}>
      <ModalDialog minWidth="400px">
        <Flex x xsb yc>
          <DialogTitle>{side === "buy" ? "Buy" : "Sell"} 1 Key</DialogTitle>
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </Flex>

        <Flex y gap1>
          <Typography level="body-lg" textColor="neutral.600">
            {hasKeys ? `You own ${supporterKeysCount} keys` : "You don't own any keys"}
          </Typography>
          <Flex x yc gap1>
            <Typography level="body-lg" textColor="neutral.600">
              {side === "buy" ? "Buy" : "Sell"} price
            </Typography>
            <Typography level="title-lg">
              {formatToDisplayString(side === "buy" ? buyPriceWithFees : sellPrice)} ETH
            </Typography>
          </Flex>
          {!hasEnoughBalance && (
            <Flex x yc>
              <Typography level="body-md" textColor="danger.400">
                Insufficient funds. Please top up your wallet.
              </Typography>
            </Flex>
          )}
          <Flex y gap1 style={{ marginTop: "16px" }}>
            <Flex x yc gap1 style={{ alignSelf: "flex-end" }}>
              <Button colorStyle="accentSecondary" color="neutral" onClick={() => close()} disabled={tx.isLoading}>
                Cancel
              </Button>

              <Button
                loading={tx.isLoading}
                onClick={() => (side === "sell" ? handleSell() : handleBuy())}
                disabled={!enableTradeButton()}
              >
                {side === "buy" ? "Buy" : "Sell"} 1 key
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
