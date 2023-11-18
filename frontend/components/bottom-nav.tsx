import { isEVMAddress } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { Flex } from "./flex";
import { Add, Person, Search } from "@mui/icons-material";
import { MAIN_COLOR } from "@/data/constants";
import { Typography } from "@ensdomains/thorin";

export function BottomNav() {
  const pathname = usePathname();
  const { address } = useAccount();

  const paths = useMemo(
    () => [
      {
        path: "/app",
        check: (pathname: string) => pathname === "/app",
        icon: <Search />,
        label: "Explore",
      },
      {
        path: "/app/submit",
        check: (pathname: string) => pathname === "/app/submit",
        icon: <Add />,
        label: "Submit",
      },
      {
        path: `/app/profile/${address}`,
        icon: <Person />,
        check: (pathname: string) => pathname.startsWith("/app/profile"),
        label: "Profile",
      },
      // {
      //   path: "/invite",
      //   check: (pathname: string) => pathname === "/invite",
      //   label: "Points",
      // },
    ],
    [address]
  );

  return (
    <Flex
      x
      yc
      xsa
      grow
      style={{
        margin: "auto",
        position: "fixed",
        bottom: 0,
        left: "50%",
        width: "100%",
        maxWidth: "500px",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        border: "1px solid grey",
        borderTop: "1px solid #CDD7E1",
        zIndex: 2,
      }}
    >
      {paths.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            height: "64px",
            width: "100%",
          }}
        >
          <Flex y xc>
            <Typography color={item.check(pathname) ? "accent" : undefined}>{item.icon}</Typography>
            <Typography color={item.check(pathname) ? "accent" : undefined}>{item.label}</Typography>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}
