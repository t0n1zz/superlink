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
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">{university.name}</h1>
        <p className="mt-1 text-slate-600">
          {university.city}, {university.province}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="text-2xl font-bold text-indigo-600">{totalStudents}</div>
          <div className="text-sm font-medium text-slate-600">Students</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="text-2xl font-bold text-indigo-600">{Math.round(avgFairScore)}</div>
          <div className="text-sm font-medium text-slate-600">Avg FairScore</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="text-2xl font-bold text-indigo-600">{placedInternships}</div>
          <div className="text-sm font-medium text-slate-600">Projects completed</div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Student leaderboard</h2>
        <ul className="space-y-1">
          {students.map((s, i) => (
            <li key={s.id}>
              <Link
                href={`/profile/${s.id}`}
                className="flex items-center gap-4 rounded-xl px-3 py-2.5 transition hover:bg-slate-50"
              >
                <span className="w-6 text-slate-500">{i + 1}</span>
                <span className="font-medium text-slate-900">
                  {s.name ?? s.walletAddress.slice(0, 8)}…
                </span>
                <span className="font-semibold text-indigo-600">
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
