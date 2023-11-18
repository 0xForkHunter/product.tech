import Image from "next/image";
import { Flex } from "./flex";
import { useRouter } from "next/navigation";
import { APP_LOGO, APP_LOGO_SMALL } from "@/data/constants";

export const Topbar = () => {
  const router = useRouter();
  return (
    <Flex
      x
      xsb
      yc
      style={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        padding: "8px",
        borderBottom: "1px solid #CDD7E1",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/app")}
        alt="App logo"
        src={APP_LOGO}
        height={60}
        width={120}
      />

      <w3m-account-button />
    </Flex>
  );
};
