import { NextResponse } from "next/server";

/**
 * Health check for production (e.g. Vercel, load balancers).
 * GET /api/health returns 200 when the app is up.
 */
export async function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
