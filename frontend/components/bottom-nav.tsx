import { isEVMAddress } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { Flex } from "./flex";
import { Add, Person, Search } from "@mui/icons-material";
import { MAIN_COLOR } from "@/constants";

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
        path: "/app/profile",
        icon: <Person />,
        check: (pathname: string) => pathname === "/app/profile",
        label: "Profile",
      },
      // {
      //   path: "/invite",
      //   check: (pathname: string) => pathname === "/invite",
      //   label: "Points",
      // },
    ],
    []
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
        borderTop: "1px solid #CDD7E1",
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
            color: item.check(pathname) ? MAIN_COLOR : undefined,
          }}
        >
          <Flex y xc style={{}}>
            {item.icon}
            {item.label}
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}
