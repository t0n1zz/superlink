import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const university = await prisma.university.findUnique({
    where: { id: slug },
  });

  if (!university) notFound();

  const students = await prisma.user.findMany({
    where: {
      university: university.name,
      userType: "STUDENT",
    },
    orderBy: { fairScore: "desc" },
    take: 50,
    include: {
      skills: { include: { skill: true } },
    },
  });

  const totalStudents = students.length;
  const avgFairScore =
    totalStudents > 0
      ? students.reduce((sum, s) => sum + s.fairScore, 0) / totalStudents
      : 0;
  const placedInternships = students.filter((s) => s.projectsCompleted > 0).length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{university.name}</h1>
        <p className="text-gray-600">
          {university.city}, {university.province}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {totalStudents}
          </div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(avgFairScore)}
          </div>
          <div className="text-sm text-gray-600">Avg FairScore</div>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {placedInternships}
          </div>
          <div className="text-sm text-gray-600">Projects completed</div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Student leaderboard</h2>
        <ul className="space-y-2">
          {students.map((s, i) => (
            <li key={s.id}>
              <Link
                href={`/profile/${s.id}`}
                className="flex items-center gap-4 p-2 rounded hover:bg-gray-50"
              >
                <span className="w-6 text-gray-500">{i + 1}</span>
                <span className="font-medium">
                  {s.name ?? s.walletAddress.slice(0, 8)}…
                </span>
                <span className="text-purple-600 font-semibold">
                  FairScore: {s.fairScore}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
