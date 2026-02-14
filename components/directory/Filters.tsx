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

export default function DirectoryFilters({
  filters,
  setFilters,
}: DirectoryFiltersProps) {
  return (
    <aside className="space-y-4">
      <h3 className="font-semibold">Filters</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          type="text"
          value={filters.city}
          onChange={(e) =>
            setFilters((f) => ({ ...f, city: e.target.value }))
          }
          placeholder="e.g. Jakarta"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skill
        </label>
        <input
          type="text"
          value={filters.skill}
          onChange={(e) =>
            setFilters((f) => ({ ...f, skill: e.target.value }))
          }
          placeholder="e.g. Solana"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Availability
        </label>
        <select
          value={filters.availability}
          onChange={(e) =>
            setFilters((f) => ({ ...f, availability: e.target.value }))
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="not_looking">Not looking</option>
        </select>
      </div>
    </aside>
  );
}
