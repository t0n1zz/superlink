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
      className="max-w-2xl space-y-6"
    >
      <div>
        <label className="mb-1.5 block font-medium text-slate-700">Job Title</label>
        <input
          {...register("title")}
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          placeholder="e.g., Solana Smart Contract Developer"
        />
        {errors.title && (
          <p className="mt-1 text-sm font-medium text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block font-medium text-slate-700">Description</label>
        <textarea
          {...register("description")}
          rows={6}
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
        {errors.description && (
          <p className="mt-1 text-sm font-medium text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block font-medium text-slate-700">Category</label>
        <input
          {...register("category")}
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
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
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="500"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Budget type</label>
          <select
            {...register("budgetType")}
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
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
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          placeholder="300"
        />
        <p className="mt-1 text-sm text-slate-500">
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
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          placeholder="e.g., 2 weeks"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {isSubmitting ? "Posting…" : "Post Job"}
      </button>
    </form>
  );
}
