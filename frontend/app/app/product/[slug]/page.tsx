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
import { useState } from "react";
import { useGetProductData } from "@/hooks/useProductTechContract";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { data } = useGetProductFromSlug(params.slug);
  const [buyModalState, setBuyModalState] = useState<"closed" | "buy" | "sell">("closed");
  const { buyPriceAfterFee } = useGetProductData(params.slug);
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
      <Flex y style={{ padding: "16px" }} gap2>
        <Flex x xsb fullwidth>
          <ProductProfile product={data} showLink />
          <Flex x gap1>
            <Button onClick={() => setBuyModalState("sell")} colorStyle="accentSecondary">
              Sell
            </Button>
            <Button onClick={() => setBuyModalState("buy")}>Buy</Button>
          </Flex>
        </Flex>
        <Typography weight="light" fontVariant="body">
          {data.description}
        </Typography>
        <Divider />
        <Typography>Holders</Typography>
      </Flex>
    </>
  );
}
