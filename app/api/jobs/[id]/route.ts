import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      poster: {
        select: {
          id: true,
          name: true,
          walletAddress: true,
          fairScore: true,
          city: true,
        },
      },
    },
  });
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}
