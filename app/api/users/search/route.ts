import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get("city");
  const skill = searchParams.get("skill");
  const minFairScore = parseInt(searchParams.get("minFairScore") || "0");
  const availability = searchParams.get("availability");

  const where: {
    fairScore?: { gte: number };
    city?: string;
    availability?: string;
    skills?: {
      some: {
        skill: {
          name: { contains: string; mode: "insensitive" };
        };
      };
    };
  } = {
    fairScore: { gte: minFairScore },
  };

  if (city) where.city = city;
  if (availability) where.availability = availability;
  if (skill) {
    where.skills = {
      some: {
        skill: {
          name: { contains: skill, mode: "insensitive" },
        },
      },
    };
  }

  const users = await prisma.user.findMany({
    where,
    include: {
      skills: {
        include: { skill: true },
        take: 5,
      },
    },
    orderBy: { fairScore: "desc" },
    take: 50,
  });

  return NextResponse.json({ users });
}
