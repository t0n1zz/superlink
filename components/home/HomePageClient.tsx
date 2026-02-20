"use client";

import Link from "next/link";
import HeroSection from "./HeroSection";

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />

      <section className="py-20 bg-slate-100/80">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 text-center max-w-xl mx-auto mb-12">
            Get discovered by companies and earn through verified reputation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center transition hover:shadow-md hover:border-slate-300">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Connect Wallet</h3>
              <p className="text-slate-600 leading-relaxed">
                Link your Solana wallet to get started
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center transition hover:shadow-md hover:border-slate-300">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Build Reputation</h3>
              <p className="text-slate-600 leading-relaxed">
                FairScore tracks your on-chain credibility
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center transition hover:shadow-md hover:border-slate-300">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get Opportunities</h3>
              <p className="text-slate-600 leading-relaxed">
                Companies find and hire verified talent
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">1,247</div>
              <div className="text-slate-600 font-medium">Verified Builders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">34</div>
              <div className="text-slate-600 font-medium">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">$125K</div>
              <div className="text-slate-600 font-medium">Paid Out</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">892</div>
              <div className="text-slate-600 font-medium">Projects Completed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
