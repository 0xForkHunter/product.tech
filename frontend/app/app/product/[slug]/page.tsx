"use client";

import { Flex } from "@/components/flex";
import { useGetProductFromSlug } from "@/hooks/useProductApi";
import { Button, Typography } from "@ensdomains/thorin";
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
  // const myHeldKeys = useMemo(() => {
  //   return holders?.keyHolders[0].product.holders() (item => item.product.holders.find(holder => holder.wallet.toLowerCase() === address?.toLowerCase()))
  // }, [address, holders?.keyHolders])

  if (!data)
    return (
      <Flex y grow yc xc>
        <CircularProgress />
      </Flex>
    );

  console.log(holders);
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
          <ProductProfile product={data} showLink />
          <Flex x gap1>
            <Button onClick={() => setBuyModalState("sell")} colorStyle="accentSecondary">
              Sell
            </Button>
            <Button onClick={() => setBuyModalState("buy")}>Buy</Button>
          </Flex>
        </Flex>
        <Typography style={{ padding: "16px" }} weight="light" fontVariant="body">
          {data.description}
        </Typography>
        <Divider />
        <Typography style={{ padding: "16px" }} fontVariant="headingFour">
          Supporters
        </Typography>
        {holders?.product.holders.map((holder) => (
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
