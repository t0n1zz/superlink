"use client";

import Link from "next/link";
import { WalletProvider } from "@/components/auth/WalletProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function HomePageClient() {
  return (
    <WalletProvider>
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Reputation-Powered Connections
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Indonesia&apos;s verified Web3 talent network, powered by FairScale
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <WalletMultiButton className="!bg-white !text-purple-600 hover:!bg-gray-100 !rounded-lg !px-6 !py-3 !font-semibold" />
              <Link
                href="/directory"
                className="px-8 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
              >
                Browse Directory
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
                <p className="text-gray-600">
                  Link your Solana wallet to get started
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-bold mb-2">Build Reputation</h3>
                <p className="text-gray-600">
                  FairScore tracks your on-chain credibility
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">Get Opportunities</h3>
                <p className="text-gray-600">
                  Companies find and hire verified talent
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  1,247
                </div>
                <div className="text-gray-600">Verified Builders</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  34
                </div>
                <div className="text-gray-600">Cities</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  $125K
                </div>
                <div className="text-gray-600">Paid Out</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  892
                </div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </WalletProvider>
  );
}
