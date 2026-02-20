"use client";

interface FiltersState {
  city: string;
  skill: string;
  minFairScore: number;
  availability: string;
}

interface DirectoryFiltersProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const inputClass =
  "w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition";

export default function DirectoryFilters({
  filters,
  setFilters,
}: DirectoryFiltersProps) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            City
          </label>
          <input
            type="text"
            value={filters.city}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
            placeholder="e.g. Jakarta"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Skill
          </label>
          <input
            type="text"
            value={filters.skill}
            onChange={(e) => setFilters((f) => ({ ...f, skill: e.target.value }))}
            placeholder="e.g. Solana"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Min FairScore
          </label>
          <input
            type="number"
            min={0}
            value={filters.minFairScore}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                minFairScore: parseInt(e.target.value, 10) || 0,
              }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Availability
          </label>
          <select
            value={filters.availability}
            onChange={(e) =>
              setFilters((f) => ({ ...f, availability: e.target.value }))
            }
            className={inputClass}
          >
            <option value="">Any</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="not_looking">Not looking</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
