import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { applicantId, coverLetter, proposedRate } = await req.json();

    const job = await prisma.job.findUnique({
      where: { id },
    });

    const applicant = await prisma.user.findUnique({
      where: { id: applicantId },
    });

    if (!job || !applicant) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (applicant.fairScore < job.minFairScore) {
      return NextResponse.json(
        {
          error: `Your FairScore (${applicant.fairScore}) is below the required minimum (${job.minFairScore})`,
        },
        { status: 403 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: id,
        applicantId,
        coverLetter,
        proposedRate,
      },
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { error: "Failed to apply" },
      { status: 500 }
    );
  }
}
