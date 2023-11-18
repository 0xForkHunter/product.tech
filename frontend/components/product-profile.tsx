"use client";
import { formatToDisplayString } from "@/lib/utils";
import { ArrowOutward, ChevronRight, LinkOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Flex } from "./flex";
import { Avatar, Button, Typography } from "@ensdomains/thorin";
import styled from "styled-components";
import { Product } from "@/hooks/useProductApi";
import { FC } from "react";
import { IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchHolders } from "@/lib/product-tech-graph";

interface Props {
  product: Product;
  subtitle?: string;
  showLink?: boolean;
}

export const ProductProfile: FC<Props> = ({ product, subtitle, showLink }) => {
  const { data: holders } = useQuery({
    queryKey: ["holders", product.slug],
    queryFn: () => fetchHolders(product.slug),
    enabled: !!product.slug,
  });

  return (
    <Flex x yc gap2>
      <div style={{ height: "50px", width: "50px" }}>
        <Avatar shape="circle" label="avatar" src={product.thumbnail_url} />
      </div>
      <Flex y gap={0.5}>
        <Flex x yc>
          <Typography fontVariant="bodyBold">{product.name}</Typography>
          {showLink && (
            <IconButton onClick={() => window.open(`https://producthunt.com/posts/${product.slug}`)}>
              <ArrowOutward fontSize="small" />
            </IconButton>
          )}
        </Flex>
        <Typography fontVariant="small" weight="light" style={{ marginTop: "-5px" }}>
          {/* {numberOfHolders.toString()} holders • Price {formatToDisplayString(buyPrice, 18)} ETH */}
          {subtitle
            ? subtitle
            : `${holders?.product?.holders.length} holders • Price ${formatToDisplayString(
                holders?.product?.buyPrice,
                18
              )} ETH`}
        </Typography>
      </Flex>
    </Flex>
  );
};
