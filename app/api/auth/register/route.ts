import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getFairScore } from "@/lib/fairscale";
import { validateWalletAddress } from "@/lib/solana";

const VALID_USER_TYPES = ["BUILDER", "STUDENT", "COMPANY", "UNIVERSITY"] as const;

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, userType, name, email } = await req.json();

    if (!walletAddress || typeof walletAddress !== "string") {
      return NextResponse.json(
        { error: "walletAddress is required" },
        { status: 400 }
      );
    }
    if (!validateWalletAddress(walletAddress)) {
      return NextResponse.json(
        { error: "Invalid Solana wallet address" },
        { status: 400 }
      );
    }

    const safeUserType =
      userType && VALID_USER_TYPES.includes(userType) ? userType : "BUILDER";

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
        userType: safeUserType,
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
