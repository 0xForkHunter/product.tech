"use client";

import { BottomNav } from "@/components/bottom-nav";
import { Flex } from "@/components/flex";
import { Topbar } from "@/components/topbar";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Flex y grow>
      <Topbar />
      {children}
      <BottomNav />
    </Flex>
  );
}
