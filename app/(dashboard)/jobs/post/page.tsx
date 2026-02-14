import JobPostForm from "@/components/jobs/JobPostForm";

export default function JobPostPage() {
  // In production, posterId comes from session/wallet
  const posterId = "placeholder-poster-id";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Post a job</h1>
      <JobPostForm posterId={posterId} />
    </div>
  );
}
