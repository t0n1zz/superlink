import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">Log in</h1>
        <p className="text-gray-600 text-center text-sm mb-4">
          Connect your Solana wallet to sign in. Use the wallet button in the
          header on the homepage.
        </p>
        <Link
          href="/"
          className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
