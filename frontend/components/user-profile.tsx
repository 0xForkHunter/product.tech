import { Flex } from "./flex";
import { useSocialData } from "@/hooks/useSocialData";
import { Avatar, Typography } from "@ensdomains/thorin";
import { useIDKit, IDKitWidget } from "@worldcoin/idkit";
import { useVerifyWorldcoinProofApi } from "@/hooks/useWorldcoinApi";
import { Button } from "@ensdomains/thorin";

const WORLDCOIN_APP_ID = "app_staging_2570b57b7eb731268147320a798453cd"

interface Props {
  address: `0x${string}`;
  subtitle?: string;
}

export const UserProfile = ({ address, subtitle }: Props) => {
  const socialData = useSocialData(address);
  const verifyWorldcoinProof = useVerifyWorldcoinProofApi();
  const { open, setOpen } = useIDKit();

  const verifyHumanityProof = async (data :any) => {
    await verifyWorldcoinProof
      .mutateAsync({ wallet: address, proof_data: data })
  };

  return (
    <Flex x yc gap2>
      {open && (
        <IDKitWidget
          app_id={WORLDCOIN_APP_ID}
          action={"verify-owner"}
          signal={`signal-${address}`}
          credential_types={["orb"]}
          handleVerify={verifyHumanityProof}
        />
      )}
      <div style={{ height: "30px", width: "30px" }}>
        <Avatar shape="circle" label="avatar" src={socialData.avatar} />
      </div>
      <Flex y>
        <Typography fontVariant="bodyBold">{socialData.name}</Typography>
        {subtitle && (
          <Typography fontVariant="small" weight="light">
            {subtitle}
          </Typography>
        )}
      </Flex>
      <Button
          loading={open}
          onClick={() => setOpen(true)}
        >
          Verify with Worldcoin
        </Button>
    </Flex>
  );
};
