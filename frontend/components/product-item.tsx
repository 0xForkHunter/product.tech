"use client";
import { formatToDisplayString } from "@/lib/utils";
import { ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Flex } from "./flex";
import { Avatar, Typography } from "@ensdomains/thorin";
import styled from "styled-components";
import { Product, useGetProductFromSlug } from "@/hooks/useProductApi";
import { ProductProfile } from "./product-profile";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CircularProgress } from "@mui/material";
import { Skeleton } from "@mui/joy";

const Container = styled(Flex)`
  &:hover {
    background-color: #e2e2e2;
  }
`;

interface Props {
  product?: Product;
  subtitle?: string;
  slug?: string;
}

export function ProductItem({ product, slug, subtitle }: Props) {
  const router = useRouter();

  const { data: prod } = useGetProductFromSlug(slug, { enabled: !product });

  const internalProduct = useMemo(() => {
    if (product) return product;
    else return prod;
  }, [prod, product]);

  if (!internalProduct) return <Skeleton variant="rectangular" width="100%" height="30px" />;

  return (
    <Container
      x
      xsb
      yc
      style={{ cursor: "pointer", padding: "8px 16px" }}
      onClick={() => router.push(`/app/product/${internalProduct.slug}`)}
    >
      <ProductProfile subtitle={subtitle || internalProduct.tagline} product={internalProduct} />
      <ChevronRight />
    </Container>
  );
}
