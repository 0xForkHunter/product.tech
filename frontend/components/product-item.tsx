"use client";
import { formatToDisplayString } from "@/lib/utils";
import { ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Flex } from "./flex";
import { Avatar, Typography } from "@ensdomains/thorin";
import styled from "styled-components";

const Container = styled(Flex)`
  &:hover {
    background-color: #e2e2e2;
  }
`;

interface Props {
  slug: string;
  avatar: string;
  name: string;
  tagline: string;
  // numberOfHolders: number;
  // buyPrice: bigint;
}

export function ProductItem({
  slug,
  // numberOfHolders, buyPrice,
  avatar,
  name,
  tagline,
}: Props) {
  const router = useRouter();
  const numberOfHolders = 3;
  const buyPrice = 1000000000000000000n;

  return (
    <Container
      x
      xsb
      yc
      style={{ cursor: "pointer", padding: "8px 16px" }}
      onClick={() => router.push(`/app/product/${slug}`)}
    >
      <Flex x yc gap2>
        <div style={{ height: "50px", width: "50px" }}>
          <Avatar shape="circle" label="avatar" src={avatar} />
        </div>
        <Flex y gap={0.5}>
          <Typography fontVariant="bodyBold">{name}</Typography>
          <Typography fontVariant="small" color="accent" weight="light">
            {/* {numberOfHolders.toString()} holders • Price {formatToDisplayString(buyPrice, 18)} ETH */}
            {tagline}
          </Typography>
        </Flex>
      </Flex>
      <ChevronRight />
    </Container>
  );
}
