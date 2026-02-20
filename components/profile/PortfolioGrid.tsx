import type { Portfolio } from "@prisma/client";

interface PortfolioGridProps {
  items: Portfolio[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900 mb-3">Portfolio</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.projectUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:shadow-md hover:border-slate-300"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
