import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Jobs</h1>
      <p className="text-gray-600 mb-6">
        Browse open opportunities or post a job (with FairScore gating).
      </p>
      <div className="flex gap-4">
        <Link
          href="/jobs/post"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700"
        >
          Post a job
        </Link>
      </div>
    </div>
  );
}
