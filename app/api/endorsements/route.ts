import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { giverId, receiverId, message, skillId } = await req.json();

    if (!giverId || !receiverId) {
      return NextResponse.json(
        { error: "giverId and receiverId are required" },
        { status: 400 }
      );
    }

    if (giverId === receiverId) {
      return NextResponse.json(
        { error: "You cannot endorse yourself" },
        { status: 400 }
      );
    }

    const [giver, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: giverId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!giver || !receiver) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const endorsement = await prisma.endorsement.create({
      data: {
        giverId,
        receiverId,
        message: message ?? undefined,
        skillId: skillId ?? undefined,
      },
    });

    return NextResponse.json({ endorsement }, { status: 201 });
  } catch (error) {
    console.error("Endorsement error:", error);
    return NextResponse.json(
      { error: "Failed to create endorsement" },
      { status: 500 }
    );
  }
}
