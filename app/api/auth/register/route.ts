import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getFairScore } from "@/lib/fairscale";

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, userType, name, email } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const fairScoreData = await getFairScore(walletAddress);

    const fairScoreTier =
      fairScoreData.score >= 900
        ? "PLATINUM"
        : fairScoreData.score >= 600
          ? "GOLD"
          : fairScoreData.score >= 300
            ? "SILVER"
            : "BRONZE";

    const user = await prisma.user.create({
      data: {
        walletAddress,
        userType: userType ?? "BUILDER",
        name,
        email,
        fairScore: fairScoreData.score,
        fairScoreTier,
        lastFairScoreSync: new Date(),
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
