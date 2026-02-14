"use client";

import { useState, useEffect } from "react";
import type { User } from "@prisma/client";
import type { UserSkill, Skill } from "@prisma/client";
import DirectoryFilters from "@/components/directory/Filters";
import BuilderCard from "@/components/directory/BuilderCard";

type Builder = User & {
  skills?: (UserSkill & { skill: Skill })[];
};

export default function DirectoryPage() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: "",
    skill: "",
    minFairScore: 0,
    availability: "",
  });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.city) params.set("city", filters.city);
    if (filters.skill) params.set("skill", filters.skill);
    if (filters.minFairScore) params.set("minFairScore", String(filters.minFairScore));
    if (filters.availability) params.set("availability", filters.availability);
    fetch(`/api/users/search?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setBuilders(data.users ?? []);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Find Builders</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <DirectoryFilters filters={filters} setFilters={setFilters} />
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-gray-500">Loading…</div>
          ) : builders.length === 0 ? (
            <div className="col-span-full text-gray-500">
              No builders match your filters.
            </div>
          ) : (
            builders.map((builder) => (
              <BuilderCard key={builder.id} builder={builder} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
