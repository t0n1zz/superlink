import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      university,
      major,
      graduationYear,
      studentId,
      studentEmail,
    } = await req.json();

    const isAcademicEmail =
      typeof studentEmail === "string" && studentEmail.endsWith(".ac.id");

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        userType: "STUDENT",
        university: university ?? undefined,
        major: major ?? undefined,
        graduationYear: graduationYear ?? undefined,
        studentId: studentId ?? undefined,
        email: studentEmail ?? undefined,
        isStudentVerified: isAcademicEmail,
        fairScore: { increment: isAcademicEmail ? 100 : 0 },
      },
    });

    return NextResponse.json({ user, verified: isAcademicEmail });
  } catch (error) {
    console.error("Student verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
