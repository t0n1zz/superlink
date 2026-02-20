"use client";

import { useState } from "react";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  projectUrl: string | null;
  tags: string[];
}

interface PortfolioEditProps {
  userId: string;
  items: PortfolioItem[];
}

export default function PortfolioEdit({ userId, items }: PortfolioEditProps) {
  const { refetch } = useCurrentUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title: title.trim(),
          description: description.trim() || undefined,
          projectUrl: projectUrl.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to add");
      setTitle("");
      setDescription("");
      setProjectUrl("");
      await refetch();
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await refetch();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Portfolio</h2>
      {items.length > 0 && (
        <ul className="space-y-2 mb-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-2 p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                {item.projectUrl && (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    {item.projectUrl}
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={deletingId === item.id}
                className="text-red-600 text-sm hover:underline disabled:opacity-50"
              >
                {deletingId === item.id ? "Deleting…" : "Remove"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd} className="space-y-2 p-3 border rounded-lg bg-gray-50">
        <p className="text-sm font-medium text-gray-700">Add item</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="w-full border rounded px-3 py-2 text-sm"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description (optional)"
          rows={2}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <input
          type="url"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          placeholder="Project URL (optional)"
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={adding}
          className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>
    </section>
  );
}
