import { NextRequest, NextResponse } from "next/server";
import { syncFairScore } from "@/lib/fairscale";

export async function POST(req: NextRequest) {
  try {
    const { userId, walletAddress } = await req.json();

    if (!userId || !walletAddress) {
      return NextResponse.json(
        { error: "userId and walletAddress are required" },
        { status: 400 }
      );
    }

    const fairScoreData = await syncFairScore(userId, walletAddress);

    return NextResponse.json({
      success: true,
      fairScore: fairScoreData,
    });
  } catch (error) {
    console.error("FairScore sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
