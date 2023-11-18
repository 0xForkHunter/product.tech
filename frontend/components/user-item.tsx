"use client";
import { formatToDisplayString } from "@/lib/utils";
import { ChevronRight } from "@mui/icons-material";
import { Skeleton, Typography } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import { useRouter } from "next/navigation";
import { Flex } from "./flex";
import styled from "styled-components";
import { useSocialData } from "@/hooks/useSocialData";

interface Props {
  address: `0x${string}`;
  subtitle?: string;
}

const Container = styled(Flex)`
  &:hover {
    background-color: #e2e2e2;
  }
`;

export function UserItem({ address, subtitle }: Props) {
  const router = useRouter();

  const socialData = useSocialData(address);

  return (
    <Container
      x
      xsb
      yc
      style={{ cursor: "pointer", padding: "8px 16px" }}
      onClick={() => router.push(`/profile/${address}`)}
    >
      <Flex x yc gap2>
        <Avatar size="sm" src={socialData.avatar}>
          <Skeleton loading={socialData.isLoading} />
        </Avatar>
        <Flex y>
          <Typography textColor={"neutral.800"} fontWeight={600} level="body-sm">
            <Skeleton loading={socialData.isLoading}>{socialData.name}</Skeleton>
          </Typography>
          {subtitle && (
            <Typography textColor={"neutral.600"} level="body-sm">
              {subtitle}
            </Typography>
          )}
        </Flex>
      </Flex>
      <ChevronRight />
    </Container>
  );
}
