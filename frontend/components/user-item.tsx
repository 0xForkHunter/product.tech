"use client";
import { formatToDisplayString } from "@/lib/utils";
import { ChevronRight } from "@mui/icons-material";
import { Skeleton, Typography } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import { useRouter } from "next/navigation";
import { Flex } from "./flex";
import styled from "styled-components";
import { useSocialData } from "@/hooks/useSocialData";
import { UserProfile } from "./user-profile";

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

  return (
    <Container
      x
      xsb
      yc
      style={{ cursor: "pointer", padding: "8px 16px" }}
      onClick={() => router.push(`/app/profile/${address}`)}
    >
      <UserProfile address={address} subtitle={subtitle} />
      <ChevronRight />
    </Container>
  );
}
