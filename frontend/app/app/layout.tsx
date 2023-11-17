"use client";

import { Bottombar } from "@/components/bottombar";
import { Flex } from "@/components/flex";
import { Topbar } from "@/components/topbar";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Flex>
      <Topbar />
      {children}
      <Bottombar />
    </Flex>
  );
}
