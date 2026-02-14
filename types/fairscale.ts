export interface FairScoreBreakdown {
  onChainActivity: number;
  socialReputation: number;
  portfolioQuality: number;
}

export interface FairScoreResponse {
  address: string;
  score: number;
  breakdown: FairScoreBreakdown;
  lastUpdated: string;
}
