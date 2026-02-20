import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function UniversitiesPage() {
  const universities = await prisma.university.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Universities</h1>
      <p className="mb-8 text-slate-600">
        Browse student talent by campus. Verified students can be discovered by
        companies here.
      </p>
      {universities.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No universities in the directory yet. Add universities via the
          database or a seed to see them here.
        </p>
      ) : (
        <ul className="space-y-2">
          {universities.map((u) => (
            <li key={u.id}>
              <Link
                href={`/universities/${u.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <span className="font-semibold text-slate-900">{u.name}</span>
                <span className="ml-2 text-sm text-slate-500">
                  {u.city}, {u.province}
                </span>
                {u.studentCount > 0 && (
                  <span className="ml-2 text-sm font-medium text-indigo-600">
                    · {u.studentCount} students
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
