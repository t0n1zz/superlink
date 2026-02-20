import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const { skillId, level } = await req.json();

    if (!skillId) {
      return NextResponse.json(
        { error: "skillId is required" },
        { status: 400 }
      );
    }

    const validLevels = ["BEGINNER", "INTERMEDIATE", "EXPERT"];
    const skillLevel =
      level && validLevels.includes(level) ? level : "BEGINNER";

    const userSkill = await prisma.userSkill.upsert({
      where: {
        userId_skillId: { userId, skillId },
      },
      create: {
        userId,
        skillId,
        level: skillLevel,
      },
      update: { level: skillLevel },
      include: { skill: true },
    });

    return NextResponse.json({ userSkill }, { status: 201 });
  } catch (error) {
    console.error("Add skill error:", error);
    return NextResponse.json(
      { error: "Failed to add skill" },
      { status: 500 }
    );
  }
}
