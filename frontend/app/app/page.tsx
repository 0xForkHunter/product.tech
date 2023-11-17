"use client";

import { Flex } from "@/components/flex";
import { ProductItem } from "@/components/product-item";
import { useGetProducts } from "@/hooks/useProductApi";

export default function AppPage() {
  const { data } = useGetProducts();
  console.log(data);
  return (
    <Flex y>
      {data?.map((product) => (
        <ProductItem key={product.id} avatar={product.thumbnail_url} name={product.name} slug={product.slug} />
      ))}
    </Flex>
  );
}
