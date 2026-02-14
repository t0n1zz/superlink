export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <a href="/" className="font-bold text-purple-600">
          Superlink
        </a>
        <div className="flex gap-4">
          <a href="/directory" className="text-gray-600 hover:text-gray-900">
            Directory
          </a>
          <a href="/jobs" className="text-gray-600 hover:text-gray-900">
            Jobs
          </a>
          <a href="/map" className="text-gray-600 hover:text-gray-900">
            Map
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
}
