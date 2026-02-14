import type { Portfolio } from "@prisma/client";

interface PortfolioGridProps {
  items: Portfolio[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.projectUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded-lg overflow-hidden hover:shadow-md transition"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-3">
              <h3 className="font-medium">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
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
