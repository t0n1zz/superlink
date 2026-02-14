export interface JobCreateInput {
  title: string;
  description: string;
  category: string;
  budget?: number;
  budgetType: "fixed" | "hourly";
  minFairScore: number;
  requiredSkills: string[];
  timeline?: string;
  location?: string;
  isRemote?: boolean;
}
