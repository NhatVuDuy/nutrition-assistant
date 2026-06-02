import type {
  UserProfile,
  BMIResult,
  MacroTargets,
  NutritionResults,
  ActivityLevel,
  WeightGoal,
} from "./types";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const GOAL_CALORIE_DELTA: Record<WeightGoal, number> = {
  lose_fast: -750,
  lose: -500,
  maintain: 0,
  gain: 500,
  gain_fast: 750,
};

export function calcBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const idealMinKg = 18.5 * heightM * heightM;
  const idealMaxKg = 24.9 * heightM * heightM;

  let category: string;
  let color: string;
  let description: string;

  if (bmi < 16) {
    category = "Thiếu cân nặng (III)";
    color = "#ef4444";
    description = "Cần tăng cân khẩn cấp, tư vấn bác sĩ ngay.";
  } else if (bmi < 17) {
    category = "Thiếu cân (II)";
    color = "#f97316";
    description = "Cân nặng quá thấp, cần bổ sung dinh dưỡng nghiêm túc.";
  } else if (bmi < 18.5) {
    category = "Thiếu cân (I)";
    color = "#eab308";
    description = "Cân nặng hơi thấp, nên bổ sung thêm dinh dưỡng.";
  } else if (bmi < 25) {
    category = "Bình thường";
    color = "#10b981";
    description = "Cân nặng lý tưởng. Duy trì lối sống lành mạnh!";
  } else if (bmi < 27.5) {
    category = "Thừa cân (I)";
    color = "#eab308";
    description = "Cân nặng hơi cao, nên kiểm soát chế độ ăn và tập luyện.";
  } else if (bmi < 30) {
    category = "Thừa cân (II)";
    color = "#f97316";
    description = "Cân nặng cao, tăng nguy cơ các bệnh mãn tính.";
  } else if (bmi < 35) {
    category = "Béo phì (I)";
    color = "#ef4444";
    description = "Béo phì độ 1, cần giảm cân và theo dõi sức khỏe.";
  } else if (bmi < 40) {
    category = "Béo phì (II)";
    color = "#dc2626";
    description = "Béo phì độ 2, nguy cơ sức khỏe cao, cần tư vấn y tế.";
  } else {
    category = "Béo phì nặng (III)";
    color = "#b91c1c";
    description = "Béo phì nặng, cần can thiệp y tế ngay lập tức.";
  }

  return {
    value: Math.round(bmi * 10) / 10,
    category,
    color,
    description,
    idealMinKg: Math.round(idealMinKg * 10) / 10,
    idealMaxKg: Math.round(idealMaxKg * 10) / 10,
  };
}

export function calcBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: "male" | "female"
): number {
  // Mifflin-St Jeor (most accurate)
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(gender === "male" ? base + 5 : base - 161);
}

export function calcTDEE(bmr: number, activity: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activity]);
}

export function calcTargetCalories(tdee: number, goal: WeightGoal): number {
  const delta = GOAL_CALORIE_DELTA[goal];
  return Math.max(1200, tdee + delta);
}

export function calcMacros(
  targetCalories: number,
  weightKg: number,
  goal: WeightGoal
): MacroTargets {
  const proteinMultipliers: Record<WeightGoal, number> = {
    lose_fast: 2.2,
    lose: 2.0,
    maintain: 1.8,
    gain: 2.0,
    gain_fast: 2.2,
  };

  const fatPercents: Record<WeightGoal, number> = {
    lose_fast: 0.25,
    lose: 0.28,
    maintain: 0.3,
    gain: 0.28,
    gain_fast: 0.25,
  };

  const proteinG = Math.round(weightKg * proteinMultipliers[goal]);
  const proteinKcal = proteinG * 4;

  const fatKcal = Math.round(targetCalories * fatPercents[goal]);
  const fatG = Math.round(fatKcal / 9);

  const carbsKcal = Math.max(0, targetCalories - proteinKcal - fatKcal);
  const carbsG = Math.round(carbsKcal / 4);

  return {
    calories: targetCalories,
    proteinG,
    carbsG,
    fatG,
    proteinKcal,
    carbsKcal,
    fatKcal,
  };
}

export function calcWater(weightKg: number, activityLevel: ActivityLevel): number {
  const base = weightKg * 35;
  const activityBonus: Record<ActivityLevel, number> = {
    sedentary: 0,
    light: 200,
    moderate: 400,
    active: 600,
    very_active: 800,
  };
  return Math.round(base + activityBonus[activityLevel]);
}

export function estimateBodyFat(
  bmi: number,
  age: number,
  gender: "male" | "female"
): number {
  // Deurenberg formula
  const sex = gender === "male" ? 1 : 0;
  const bf = 1.2 * bmi + 0.23 * age - 10.8 * sex - 5.4;
  return Math.max(3, Math.round(bf * 10) / 10);
}

export function calculate(profile: UserProfile): NutritionResults {
  const bmi = calcBMI(profile.weightKg, profile.heightCm);
  const bmr = calcBMR(
    profile.weightKg,
    profile.heightCm,
    profile.age,
    profile.gender
  );
  const tdee = calcTDEE(bmr, profile.activityLevel);
  const targetCalories = calcTargetCalories(tdee, profile.weightGoal);
  const macros = calcMacros(targetCalories, profile.weightKg, profile.weightGoal);
  const waterMl = calcWater(profile.weightKg, profile.activityLevel);
  const bodyFatEstimate = estimateBodyFat(bmi.value, profile.age, profile.gender);

  return { bmi, bmr, tdee, targetCalories, macros, waterMl, bodyFatEstimate };
}
