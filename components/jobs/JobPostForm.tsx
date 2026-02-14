"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const jobSchema = z.object({
  title: z.string().min(10, "At least 10 characters"),
  description: z.string().min(50, "At least 50 characters"),
  category: z.string().min(1, "Required"),
  budget: z.number().positive().optional(),
  budgetType: z.enum(["fixed", "hourly"]),
  minFairScore: z.number().min(0).max(1000),
  requiredSkills: z.array(z.string()),
  timeline: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobPostFormProps {
  posterId: string;
  onSuccess?: (jobId: string) => void;
}

export default function JobPostForm({ posterId, onSuccess }: JobPostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      budgetType: "fixed",
      minFairScore: 0,
      requiredSkills: [],
    },
  });

  const onSubmit = async (data: JobFormData) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        posterId,
      }),
    });

    if (res.ok) {
      const { job } = await res.json();
      if (onSuccess) onSuccess(job.id);
      else window.location.href = `/jobs/${job.id}`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <label className="block font-medium mb-2">Job Title</label>
        <input
          {...register("title")}
          className="w-full border rounded-lg p-3"
          placeholder="e.g., Solana Smart Contract Developer"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">Description</label>
        <textarea
          {...register("description")}
          rows={6}
          className="w-full border rounded-lg p-3"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">Category</label>
        <input
          {...register("category")}
          className="w-full border rounded-lg p-3"
          placeholder="e.g., Development"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">Budget (optional)</label>
          <input
            type="number"
            {...register("budget", { valueAsNumber: true })}
            className="w-full border rounded-lg p-3"
            placeholder="500"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Budget type</label>
          <select
            {...register("budgetType")}
            className="w-full border rounded-lg p-3"
          >
            <option value="fixed">Fixed</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">
          Minimum FairScore Required
        </label>
        <input
          type="number"
          {...register("minFairScore", { valueAsNumber: true })}
          className="w-full border rounded-lg p-3"
          placeholder="300"
        />
        <p className="text-sm text-gray-500 mt-1">
          Only builders with this score or higher can apply
        </p>
        {errors.minFairScore && (
          <p className="text-red-500 text-sm mt-1">
            {errors.minFairScore.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">Timeline (optional)</label>
        <input
          {...register("timeline")}
          className="w-full border rounded-lg p-3"
          placeholder="e.g., 2 weeks"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
      >
        {isSubmitting ? "Posting…" : "Post Job"}
      </button>
    </form>
  );
}
