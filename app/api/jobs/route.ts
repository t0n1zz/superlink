import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      posterId,
      title,
      description,
      category,
      budget,
      budgetType,
      minFairScore,
      requiredSkills,
      timeline,
      location,
      isRemote,
    } = body;

    if (!posterId || !title || !description || !category) {
      return NextResponse.json(
        { error: "Missing required fields: posterId, title, description, category" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        posterId,
        title,
        description,
        category,
        budget: budget ?? undefined,
        budgetType: budgetType ?? "fixed",
        minFairScore: minFairScore ?? 0,
        requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
        timeline: timeline ?? undefined,
        location: location ?? undefined,
        isRemote: isRemote ?? true,
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Job creation error:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "open";

  const jobs = await prisma.job.findMany({
    where: { status },
    include: {
      poster: {
        select: { id: true, name: true, fairScore: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ jobs });
}
