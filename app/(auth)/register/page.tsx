import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-center text-xl font-bold text-slate-900">Create account</h1>
        <p className="mb-6 text-center text-sm text-slate-600">
          Connect your Solana wallet and register via the homepage. Your
          FairScore will be fetched automatically.
        </p>
        <Link
          href="/"
          className="block w-full rounded-xl bg-indigo-600 py-2.5 text-center font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
