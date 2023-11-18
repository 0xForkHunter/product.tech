import { Flex } from "./flex";
import { useSocialData } from "@/hooks/useSocialData";
import { Avatar, Typography } from "@ensdomains/thorin";

interface Props {
  address: `0x${string}`;
  subtitle?: string;
}

export const UserProfile = ({ address, subtitle }: Props) => {
  const socialData = useSocialData(address);

  return (
    <Flex x yc gap2>
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
    </Flex>
  );
};
