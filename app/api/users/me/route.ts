import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const walletAddress = req.nextUrl.searchParams.get("walletAddress");
  if (!walletAddress) {
    return NextResponse.json(
      { error: "walletAddress is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { walletAddress },
    include: {
      skills: { include: { skill: true } },
      portfolioItems: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
