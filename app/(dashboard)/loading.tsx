export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-9 w-64 rounded-lg bg-slate-200" />
      <div className="h-5 w-96 max-w-full rounded bg-slate-100" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 rounded-2xl border border-slate-200 bg-white"
          >
            <div className="p-4">
              <div className="mb-2 h-5 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
