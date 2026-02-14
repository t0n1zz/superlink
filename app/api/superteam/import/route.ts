import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { scrapeSuperearnProfile } from "@/lib/superteam-scraper";

export async function POST(req: NextRequest) {
  try {
    const { userId, username } = await req.json();

    const earnData = await scrapeSuperearnProfile(username);

    const scoreBoost = Math.min(
      earnData.completedBounties * 10 +
        Math.floor(earnData.totalEarned / 10),
      500
    );

    await prisma.superearnImport.upsert({
      where: { userId },
      update: {
        username,
        totalBounties: earnData.totalBounties,
        completedBounties: earnData.completedBounties,
        totalEarned: earnData.totalEarned,
        lastImport: new Date(),
        data: earnData as unknown as object,
      },
      create: {
        userId,
        username,
        totalBounties: earnData.totalBounties,
        completedBounties: earnData.completedBounties,
        totalEarned: earnData.totalEarned,
        data: earnData as unknown as object,
      },
    });

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        fairScore: { increment: scoreBoost },
      },
    });

    return NextResponse.json({
      success: true,
      earnData,
      scoreBoost,
      newFairScore: user.fairScore,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: "Import failed" },
      { status: 500 }
    );
  }
}
