"use client";

import { Flex } from "@/components/flex";
import { ProductItem } from "@/components/product-item";
import { UserProfile } from "@/components/user-profile";
import { fetchHoldings } from "@/lib/product-tech-graph";
import { shortAddress } from "@/lib/utils";
import { Typography } from "@ensdomains/thorin";
import { Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export default function ProfilePage({ params }: { params: { address: `0x${string}` } }) {
  const { data: holdings } = useQuery({
    queryKey: ["holders", params.address],
    queryFn: () => fetchHoldings(params.address),
    enabled: !!params.address,
  });

  const { address } = useAccount();

  const isOwnProfile = params.address.toLowerCase() === address?.toLowerCase();
  console.log(holdings);
  return (
    <Flex y style={{ padding: "16px" }} gap2>
      <UserProfile address={params.address} subtitle={shortAddress(params.address)} />
      {isOwnProfile && <Flex></Flex>}
      <Divider />
      <Typography>Supported products</Typography>
      {holdings?.keyHolders.map((item) => (
        <ProductItem key={item.product.id} slug={item.product.id} />
      ))}
    </Flex>
  );
}
