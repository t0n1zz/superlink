"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import JobPostForm from "@/components/jobs/JobPostForm";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";

export default function JobPostPageClient() {
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-gray-500">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-gray-600 mb-4">
          Connect your wallet and create a profile to post a job.
        </p>
        <Link href="/" className="text-purple-600 hover:underline">
          Go to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Post a job</h1>
      <JobPostForm
        posterId={user.id}
        onSuccess={(jobId) => router.push(`/jobs/${jobId}`)}
      />
    </div>
  );
}
