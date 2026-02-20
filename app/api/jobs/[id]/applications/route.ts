import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const job = await prisma.job.findUnique({
    where: { id },
    select: { id: true, posterId: true },
  });
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const applications = await prisma.jobApplication.findMany({
    where: { jobId: id },
    include: {
      applicant: {
        select: {
          id: true,
          name: true,
          walletAddress: true,
          fairScore: true,
          city: true,
          profilePhoto: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ job, applications });
}
