"use client";

import { Flex } from "@/components/flex";
import { useGetProductFromSlug } from "@/hooks/useProductApi";
import { Button, Tooltip, Typography } from "@ensdomains/thorin";
import { CircularProgress, Divider } from "@mui/material";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import ImageGallery from "@/components/gallery";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ProductItem } from "@/components/product-item";
import { ProductProfile } from "@/components/product-profile";
import { TradeKeyModal } from "@/components/trade-key-modal";
import { useMemo, useState } from "react";
import { useGetProductData } from "@/hooks/useProductTechContract";
import { useQuery } from "@tanstack/react-query";
import { fetchHolders } from "@/lib/product-tech-graph";
import { UserItem } from "@/components/user-item";
import { useAccount } from "wagmi";
import { formatToDisplayString } from "@/lib/utils";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { data } = useGetProductFromSlug(params.slug);
  const [buyModalState, setBuyModalState] = useState<"closed" | "buy" | "sell">("closed");
  const { buyPriceAfterFee } = useGetProductData(params.slug);
  const { data: holders } = useQuery({
    queryKey: ["holders", params.slug],
    queryFn: () => fetchHolders(params.slug),
    enabled: !!params.slug,
  });

  console.log(holders);
  const { address } = useAccount();
  const myHeldKeys = useMemo(() => {
    return holders?.product?.holders.find((holder) => holder.wallet.toLowerCase() === address?.toLowerCase())
      ?.keysAmount;
  }, [address, holders?.product?.holders]);

  if (!data)
    return (
      <Flex y grow yc xc>
        <CircularProgress />
      </Flex>
    );

  return (
    <>
      {buyModalState !== "closed" && (
        <TradeKeyModal
          hasKeys={false}
          slug={params.slug}
          buyPriceWithFees={buyPriceAfterFee}
          close={() => setBuyModalState("closed")}
          side={buyModalState}
        />
      )}
      <Flex y>
        <Flex x xsb fullwidth style={{ padding: "16px" }}>
          <ProductProfile product={data} showLink subtitle={data.tagline} />
          <Flex x gap1>
            {myHeldKeys && Number(myHeldKeys) > 0 && (
              <Button size="small" onClick={() => setBuyModalState("sell")} colorStyle="accentSecondary">
                Sell
              </Button>
            )}
            <Button size="small" onClick={() => setBuyModalState("buy")}>
              Buy
            </Button>
          </Flex>
        </Flex>
        <Flex x yc gap3 style={{ padding: "0 16px" }}>
          <Typography color="accent" weight="light" fontVariant="small">
            Total keys {holders?.product?.supply}
          </Typography>
          <Typography color="accent" weight="light" fontVariant="small">
            Price: {formatToDisplayString(holders?.product?.buyPrice, 18)} ETH
          </Typography>
        </Flex>
        <Typography style={{ padding: "16px" }} weight="light" fontVariant="body">
          {data.description}
        </Typography>

        <Flex yc style={{ padding: "0 16px 15px" }}>
          <Typography color="accent" weight="light" fontVariant="small" style={{ flexBasis: "100%" }}>
            Product earnings: 0.0002 ETH
          </Typography>
          <Tooltip content="Only the product owner can collect product owners">
            <Button style={{ width: "200px" }} disabled size="small">
              Collect
            </Button>
          </Tooltip>
        </Flex>

        <Divider />
        <Typography style={{ padding: "16px" }} fontVariant="headingFour">
          Holders
        </Typography>

        {holders?.product?.holders.map((holder) => (
          <UserItem
            key={holder.wallet}
            address={holder.wallet as `0x${string}`}
            subtitle={`Owns ${holder.keysAmount} keys`}
          />
        ))}
      </Flex>
    </>
  );
}
