import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const users = await prisma.user.findMany({
    where: {
      latitude: { not: null },
      longitude: { not: null },
    },
    select: {
      id: true,
      name: true,
      city: true,
      latitude: true,
      longitude: true,
      fairScore: true,
      profilePhoto: true,
    },
  });

  const usersWithCoords = users.filter(
    (u) => u.latitude != null && u.longitude != null
  );

  return NextResponse.json({
    users: usersWithCoords as {
      id: string;
      name: string | null;
      city: string | null;
      latitude: number;
      longitude: number;
      fairScore: number;
      profilePhoto: string | null;
    }[],
  });
}
