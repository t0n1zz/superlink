import axios from "axios";
import { prisma } from "@/lib/db";

const FAIRSCALE_API_URL =
  process.env.FAIRSCALE_API_URL || "https://api.fairscale.xyz";
const FAIRSCALE_API_KEY = process.env.FAIRSCALE_API_KEY;

export interface FairScoreResponse {
  address: string;
  score: number;
  breakdown: {
    onChainActivity: number;
    socialReputation: number;
    portfolioQuality: number;
  };
  lastUpdated: string;
}

export async function getFairScore(
  walletAddress: string
): Promise<FairScoreResponse> {
  try {
    const response = await axios.get<FairScoreResponse>(
      `${FAIRSCALE_API_URL}/score/${walletAddress}`,
      {
        headers: {
          Authorization: `Bearer ${FAIRSCALE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("FairScale API error:", error);
    // Return default score if API fails
    return {
      address: walletAddress,
      score: 0,
      breakdown: {
        onChainActivity: 0,
        socialReputation: 0,
        portfolioQuality: 0,
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}

export async function syncFairScore(userId: string, walletAddress: string) {
  const fairScoreData = await getFairScore(walletAddress);

  const fairScoreTier =
    fairScoreData.score >= 900
      ? "PLATINUM"
      : fairScoreData.score >= 600
        ? "GOLD"
        : fairScoreData.score >= 300
          ? "SILVER"
          : "BRONZE";

  await prisma.user.update({
    where: { id: userId },
    data: {
      fairScore: fairScoreData.score,
      fairScoreTier,
      lastFairScoreSync: new Date(),
      fairScoreHistory: {
        ...fairScoreData,
        timestamp: new Date(),
      },
    },
  });

  return fairScoreData;
}
