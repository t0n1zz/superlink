import type { UserType, FairScoreTier } from "@prisma/client";

export type { UserType, FairScoreTier };

export interface UserProfile {
  id: string;
  walletAddress: string;
  name: string | null;
  bio: string | null;
  profilePhoto: string | null;
  city: string | null;
  province: string | null;
  country: string;
  fairScore: number;
  fairScoreTier: FairScoreTier;
  userType: UserType;
  availability: string;
  rating: number;
  projectsCompleted: number;
}
