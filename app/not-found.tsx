import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-lg text-slate-600">
          This page doesn’t exist or was moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
