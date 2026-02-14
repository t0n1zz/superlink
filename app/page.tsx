"use client";

import dynamic from "next/dynamic";

const HomePageClient = dynamic(
  () => import("@/components/home/HomePageClient"),
  { ssr: false }
);

export default function HomePage() {
  return <HomePageClient />;
}
