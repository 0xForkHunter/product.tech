"use client";

import { Flex } from "@/components/flex";
import { ProductItem } from "@/components/product-item";
import { useGetProducts } from "@/hooks/useProductApi";
import { Typography } from "@ensdomains/thorin";

export default function AppPage() {
  const { data } = useGetProducts();
  console.log(data);
  return (
    <Flex y style={{ padding: "16px 0px" }}>
      <Typography>Products</Typography>
      {data?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Flex>
  );
}
