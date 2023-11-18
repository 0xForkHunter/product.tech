"use client";

import { Flex } from "@/components/flex";
import { ProductItem } from "@/components/product-item";
import { useGetProducts } from "@/hooks/useProductApi";
import { Typography } from "@ensdomains/thorin";
import { Divider } from "@mui/material";

export default function AppPage() {
  const { data } = useGetProducts();
  console.log(data);
  return (
    <Flex y>
      <Typography fontVariant="headingFour" style={{ padding: "16px 16px" }}>
        Top Products
      </Typography>
      {data?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Flex>
  );
}
