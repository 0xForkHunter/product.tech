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

interface Props {
  product: Product;
  showLink?: boolean;
}

export const ProductProfile: FC<Props> = ({ product, showLink }) => {
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
        <Typography fontVariant="small" weight="light" style={{ marginTop: "-10px" }}>
          {/* {numberOfHolders.toString()} holders • Price {formatToDisplayString(buyPrice, 18)} ETH */}
          {product.tagline}
        </Typography>
      </Flex>
    </Flex>
  );
};
