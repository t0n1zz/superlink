"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";
import PortfolioEdit from "@/components/profile/PortfolioEdit";
import SkillsEdit from "@/components/profile/SkillsEdit";

export default function ProfileEditPage() {
  const { user: currentUser, loading } = useCurrentUser();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    city: "",
    province: "",
    availability: "available",
    website: "",
    twitter: "",
    github: "",
    linkedin: "",
    hourlyRate: "",
  });

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace("/");
      return;
    }
    if (currentUser) {
      setForm({
        name: (currentUser.name as string) ?? "",
        bio: (currentUser.bio as string) ?? "",
        city: (currentUser.city as string) ?? "",
        province: (currentUser.province as string) ?? "",
        availability: (currentUser.availability as string) ?? "available",
        website: (currentUser.website as string) ?? "",
        twitter: (currentUser.twitter as string) ?? "",
        github: (currentUser.github as string) ?? "",
        linkedin: (currentUser.linkedin as string) ?? "",
        hourlyRate:
          currentUser.hourlyRate != null
            ? String(currentUser.hourlyRate)
            : "",
      });
    }
  }, [currentUser, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || null,
          bio: form.bio || null,
          city: form.city || null,
          province: form.province || null,
          availability: form.availability,
          website: form.website || null,
          twitter: form.twitter || null,
          github: form.github || null,
          linkedin: form.linkedin || null,
          hourlyRate: form.hourlyRate ? parseInt(form.hourlyRate, 10) : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to update");
      }
      router.push(`/profile/${currentUser.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Loading…
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={`/profile/${currentUser.id}`}
        className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
      >
        ← Back to profile
      </Link>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit profile</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block font-medium text-slate-700">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-medium text-slate-700">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={4}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block font-medium text-slate-700">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-medium text-slate-700">Province</label>
              <input
                type="text"
                value={form.province}
                onChange={(e) =>
                  setForm((f) => ({ ...f, province: e.target.value }))
                }
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block font-medium text-slate-700">Availability</label>
            <select
              value={form.availability}
              onChange={(e) =>
                setForm((f) => ({ ...f, availability: e.target.value }))
              }
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="not_looking">Not looking</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-medium text-slate-700">Hourly rate (USDC)</label>
            <input
              type="number"
              value={form.hourlyRate}
              onChange={(e) =>
                setForm((f) => ({ ...f, hourlyRate: e.target.value }))
              }
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-medium text-slate-700">Website</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) =>
                setForm((f) => ({ ...f, website: e.target.value }))
              }
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="https://"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block font-medium text-slate-700">Twitter</label>
              <input
                type="text"
                value={form.twitter}
                onChange={(e) =>
                  setForm((f) => ({ ...f, twitter: e.target.value }))
                }
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-medium text-slate-700">GitHub</label>
              <input
                type="text"
                value={form.github}
                onChange={(e) =>
                  setForm((f) => ({ ...f, github: e.target.value }))
                }
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-medium text-slate-700">LinkedIn</label>
              <input
                type="text"
                value={form.linkedin}
                onChange={(e) =>
                  setForm((f) => ({ ...f, linkedin: e.target.value }))
                }
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
        </form>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SkillsEdit
          userId={currentUser.id}
          items={
            (currentUser.skills as {
              id: string;
              skillId: string;
              level: string;
              skill: { id: string; name: string; category: string };
            }[]) ?? []
          }
        />
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <PortfolioEdit
          userId={currentUser.id}
          items={
            (currentUser.portfolioItems as {
              id: string;
              title: string;
              description: string | null;
              imageUrl: string | null;
              projectUrl: string | null;
              tags: string[];
            }[]) ?? []
          }
        />
      </div>
    </div>
  );
}
