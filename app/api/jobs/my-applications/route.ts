import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const applicantId = req.nextUrl.searchParams.get("applicantId");
  if (!applicantId) {
    return NextResponse.json(
      { error: "applicantId is required" },
      { status: 400 }
    );
  }

  const applications = await prisma.jobApplication.findMany({
    where: { applicantId },
    include: {
      job: {
        include: {
          poster: {
            select: { id: true, name: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ applications });
}
