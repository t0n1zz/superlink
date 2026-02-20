import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      skills: { include: { skill: true } },
      portfolioItems: true,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

const ALLOWED_PROFILE_FIELDS = [
  "name",
  "bio",
  "profilePhoto",
  "city",
  "province",
  "country",
  "twitter",
  "github",
  "linkedin",
  "telegram",
  "discord",
  "website",
  "hourlyRate",
  "availability",
  "latitude",
  "longitude",
] as const;

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const body = await req.json();

    const data: Record<string, unknown> = {};
    for (const key of ALLOWED_PROFILE_FIELDS) {
      if (body[key] !== undefined) {
        if (key === "hourlyRate" && body[key] !== null) {
          data[key] = parseInt(String(body[key]), 10);
        } else if ((key === "latitude" || key === "longitude") && body[key] !== null) {
          data[key] = parseFloat(String(body[key]));
        } else {
          data[key] = body[key];
        }
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
