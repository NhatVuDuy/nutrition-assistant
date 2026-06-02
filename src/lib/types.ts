export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type WeightGoal = "lose_fast" | "lose" | "maintain" | "gain" | "gain_fast";

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
  rda: number;
  upperLimit?: number;
  sources: string[];
  icon: string;
  category: "vitamin" | "mineral";
}
