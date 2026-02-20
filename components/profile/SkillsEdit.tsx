"use client";

import { useState, useEffect } from "react";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface UserSkillItem {
  id: string;
  skillId: string;
  level: string;
  skill: Skill;
}

interface SkillsEditProps {
  userId: string;
  items: UserSkillItem[];
}

export default function SkillsEdit({ userId, items }: SkillsEditProps) {
  const { refetch } = useCurrentUser();
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [level, setLevel] = useState("BEGINNER");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setAllSkills)
      .catch(() => {});
  }, []);

  const existingSkillIds = new Set(items.map((i) => i.skillId));
  const availableSkills = allSkills.filter((s) => !existingSkillIds.has(s.id));

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkillId) return;
    setAdding(true);
    try {
      const res = await fetch(`/api/users/${userId}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: selectedSkillId, level }),
      });
      if (!res.ok) throw new Error("Failed to add");
      setSelectedSkillId("");
      setLevel("BEGINNER");
      await refetch();
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (userSkillId: string) => {
    setDeletingId(userSkillId);
    try {
      const res = await fetch(`/api/user-skills/${userSkillId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove");
      await refetch();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Skills</h2>
      {items.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-4">
          {items.map((us) => (
            <li
              key={us.id}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm"
            >
              <span>
                {us.skill.name}
                {us.level && (
                  <span className="text-gray-500 ml-1">({us.level})</span>
                )}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(us.id)}
                disabled={deletingId === us.id}
                className="text-red-600 hover:underline text-xs disabled:opacity-50"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      {availableSkills.length > 0 && (
        <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-2">
          <select
            value={selectedSkillId}
            onChange={(e) => setSelectedSkillId(e.target.value)}
            className="border rounded px-3 py-2 text-sm min-w-[140px]"
          >
            <option value="">Add skill…</option>
            {availableSkills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="EXPERT">Expert</option>
          </select>
          <button
            type="submit"
            disabled={adding || !selectedSkillId}
            className="px-3 py-2 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
          >
            {adding ? "Adding…" : "Add"}
          </button>
        </form>
      )}
    </section>
  );
}
