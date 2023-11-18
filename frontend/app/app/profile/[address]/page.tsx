"use client";

import { Flex } from "@/components/flex";
import { ProductItem } from "@/components/product-item";
import { UserProfile } from "@/components/user-profile";
import { useVerifyWorldcoinProofApi } from "@/hooks/useWorldcoinApi";
import { fetchHoldings } from "@/lib/product-tech-graph";
import { shortAddress } from "@/lib/utils";
import { Button, Typography } from "@ensdomains/thorin";
import { Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CredentialType, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import { useAccount } from "wagmi";

export default function ProfilePage({ params }: { params: { address: `0x${string}` } }) {
  const { data: holdings } = useQuery({
    queryKey: ["holders", params.address],
    queryFn: () => fetchHoldings(params.address),
    enabled: !!params.address,
  });

  const { address } = useAccount();

  const isOwnProfile = params.address.toLowerCase() === address?.toLowerCase();

  const WORLDCOIN_APP_ID = "app_staging_2570b57b7eb731268147320a798453cd";
  const verifyWorldcoinProof = useVerifyWorldcoinProofApi();
  const { open, setOpen } = useIDKit();

  const verifyHumanityProof = async (data: any) => {
    await verifyWorldcoinProof.mutateAsync({ wallet: address!, proof_data: data });
  };

  return (
    <Flex y>
      <Flex y gap1 style={{ padding: "16px" }}>
        <Flex x xsb yc>
          <UserProfile address={params.address} subtitle={shortAddress(params.address)} />
          {isOwnProfile && (
            <Button
              colorStyle="accentSecondary"
              style={{ width: "200px" }}
              size="small"
              disabled={open}
              loading={open}
              onClick={() => setOpen(true)}
            >
              Verify with Worldcoin
            </Button>
          )}
        </Flex>
        {isOwnProfile && <Flex></Flex>}
      </Flex>
      {open && (
        <IDKitWidget
          app_id={WORLDCOIN_APP_ID}
          action={"verify-owner"}
          signal={`signal-${address}`}
          credential_types={[CredentialType.Orb]}
          handleVerify={verifyHumanityProof}
        />
      )}
      <Divider />
      <Typography style={{ padding: "16px" }} fontVariant="headingFour">
        Products
      </Typography>
      {holdings?.keyHolders.map((item) => (
        <ProductItem key={item.product.id} slug={item.product.id} subtitle={`Owns ${item.keysAmount} keys`} />
      ))}
    </Flex>
  );
}
