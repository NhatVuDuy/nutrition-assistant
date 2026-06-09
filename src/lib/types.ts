export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type WeightGoal = "lose_fast" | "lose" | "maintain" | "gain" | "gain_fast";

export type NutrientCategory = "vitamin" | "mineral" | "amino_acid" | "fatty_acid" | "bioactive";

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  weightGoal: WeightGoal;
}

export interface BMIResult {
  value: number;
  category: string;
  color: string;
  description: string;
  idealMinKg: number;
  idealMaxKg: number;
}

export interface MacroTargets {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  proteinKcal: number;
  carbsKcal: number;
  fatKcal: number;
}

export interface NutritionResults {
  bmi: BMIResult;
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: MacroTargets;
  waterMl: number;
  bodyFatEstimate?: number;
}

export interface Micronutrient {
  name: string;
  unit: string;
  rda: number | null;        // null = no established RDA
  rdaNote?: string;          // e.g. "× kg thể trọng" for amino acids
  upperLimit?: number;
  upperLimitDisplay?: string;
  sources: string[];
  icon: string;
  category: NutrientCategory;
  subgroup?: string;
  deficiency?: string;
  excess?: string;
  personalized?: boolean;    // true if RDA calculated from individual metrics
  suggestion?: string;       // for bioactives with no RDA
}
