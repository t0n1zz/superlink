import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, title, description, imageUrl, projectUrl, tags } =
      await req.json();

    if (!userId || !title) {
      return NextResponse.json(
        { error: "userId and title are required" },
        { status: 400 }
      );
    }

    const item = await prisma.portfolio.create({
      data: {
        userId,
        title,
        description: description ?? undefined,
        imageUrl: imageUrl ?? undefined,
        projectUrl: projectUrl ?? undefined,
        tags: Array.isArray(tags) ? tags : [],
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Portfolio create error:", error);
    return NextResponse.json(
      { error: "Failed to add portfolio item" },
      { status: 500 }
    );
  }
}
