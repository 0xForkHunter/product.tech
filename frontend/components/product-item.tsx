"use client";
import { formatToDisplayString } from "@/lib/utils";
import { ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Flex } from "./flex";
import { Avatar, Typography } from "@ensdomains/thorin";
import styled from "styled-components";
import { Product } from "@/hooks/useProductApi";
import { ProductProfile } from "./product-profile";

const Container = styled(Flex)`
  &:hover {
    background-color: #e2e2e2;
  }
`;

interface Props {
  product: Product;
}

export function ProductItem({ product }: Props) {
  const router = useRouter();
  const numberOfHolders = 3;
  const buyPrice = 1000000000000000000n;

  return (
    <Container
      x
      xsb
      yc
      style={{ cursor: "pointer", padding: "8px 16px" }}
      onClick={() => router.push(`/app/product/${product.slug}`)}
    >
      <ProductProfile product={product} />
      <ChevronRight />
    </Container>
  );
}
