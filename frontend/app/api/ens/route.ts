import { getEnsProfile } from "@/lib/api/common/ens";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const res = await getEnsProfile(searchParams.get("address") as `0x${string}`);
  return NextResponse.json({ data: res });
};
