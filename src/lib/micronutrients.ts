import type { Micronutrient } from "./types";

type AgeGroup = "child" | "teen" | "young_adult" | "adult" | "senior_early" | "senior";

function getAgeGroup(age: number): AgeGroup {
  if (age <= 13) return "child";
  if (age <= 18) return "teen";
  if (age <= 30) return "young_adult";
  if (age <= 50) return "adult";
  if (age <= 70) return "senior_early";
  return "senior";
}

export function getMicronutrients(
  age: number,
  gender: "male" | "female",
  weightKg: number,
  targetCalories: number
): Micronutrient[] {
  const g = getAgeGroup(age);
  const isMale = gender === "male";

  // ── VITAMINS ────────────────────────────────────────────────────────────────

  const vitaminA: Micronutrient = {
    name: "Vitamin A",
    unit: "mcg RAE",
    rda: g === "child" ? 600 : isMale ? 900 : 700,
    upperLimit: g === "child" ? 1700 : g === "teen" ? 2800 : 3000,
    upperLimitDisplay: g === "child" ? "1700 mcg" : g === "teen" ? "2800 mcg" : "3000 mcg",
    sources: ["Gan bò", "Cà rốt", "Khoai lang", "Rau ngót", "Bí đỏ"],
    icon: "🥕",
    category: "vitamin",
    deficiency: "Quáng gà, khô mắt, suy giảm miễn dịch",
    excess: "Độc gan, dị tật thai nhi (bổ sung liều cao)",
    personalized: false,
  };

  const vitaminD: Micronutrient = {
    name: "Vitamin D",
    unit: "IU",
    rda: age >= 71 ? 800 : 600,
    upperLimit: 4000,
    upperLimitDisplay: "4000 IU",
    sources: ["Ánh nắng mặt trời", "Cá hồi", "Cá thu", "Nấm", "Sữa tăng cường"],
    icon: "☀️",
    category: "vitamin",
    deficiency: "Còi xương (trẻ em), loãng xương, suy cơ",
    excess: "Tăng canxi máu, sỏi thận",
    personalized: false,
  };

  const vitaminE: Micronutrient = {
    name: "Vitamin E",
    unit: "mg AT",
    rda: g === "child" ? 11 : 15,
    upperLimit: g === "child" ? 800 : 1000,
    upperLimitDisplay: g === "child" ? "800 mg" : "1000 mg",
    sources: ["Dầu hướng dương", "Hạnh nhân", "Hạt hướng dương", "Rau bina", "Dầu ô-liu"],
    icon: "🌻",
    category: "vitamin",
    deficiency: "Rối loạn thần kinh, thiếu máu tán huyết",
    excess: "Tăng nguy cơ chảy máu (liều rất cao)",
    personalized: false,
  };

  const vitaminK: Micronutrient = {
    name: "Vitamin K",
    unit: "mcg",
    rda: g === "child" ? 60 : g === "teen" ? 75 : isMale ? 120 : 90,
    sources: ["Rau muống", "Bông cải xanh", "Rau chân vịt", "Đậu nành", "Dầu đậu nành"],
    icon: "🥦",
    category: "vitamin",
    deficiency: "Chảy máu, giảm mật độ xương",
    excess: "Hiếm gặp từ thực phẩm",
    personalized: false,
  };

  const vitaminC: Micronutrient = {
    name: "Vitamin C",
    unit: "mg",
    rda:
      g === "child" ? 45 :
      g === "teen" ? (isMale ? 75 : 65) :
      isMale ? 90 : 75,
    upperLimit: g === "child" ? 1200 : g === "teen" ? 1800 : 2000,
    upperLimitDisplay: g === "child" ? "1200 mg" : g === "teen" ? "1800 mg" : "2000 mg",
    sources: ["Ổi", "Ớt chuông", "Cam", "Dâu tây", "Bông cải xanh", "Kiwi"],
    icon: "🍊",
    category: "vitamin",
    deficiency: "Scurvy, chậm lành vết thương, suy giảm miễn dịch",
    excess: "Tiêu chảy, buồn nôn, sỏi oxalat thận (liều rất cao)",
    personalized: false,
  };

  // B1 — personalized by calories
  const b1TableVal =
    g === "child" ? 0.9 :
    g === "teen" ? (isMale ? 1.2 : 1.0) :
    isMale ? 1.2 : 1.1;
  const b1Rda = Math.round(Math.max(b1TableVal, (targetCalories / 1000) * 0.5) * 10) / 10;

  const vitaminB1: Micronutrient = {
    name: "Vitamin B1 (Thiamine)",
    unit: "mg",
    rda: b1Rda,
    rdaNote: `max(${b1TableVal}mg bảng, ${(targetCalories / 1000).toFixed(1)}×0.5/1000kcal)`,
    sources: ["Thịt lợn", "Ngũ cốc nguyên hạt", "Đậu Hà Lan", "Hạt hướng dương", "Gạo lứt"],
    icon: "🌾",
    category: "vitamin",
    deficiency: "Bệnh Beriberi, rối loạn thần kinh, suy tim",
    excess: "Không độc từ thực phẩm",
    personalized: true,
  };

  // B2 — personalized by calories
  const b2TableVal =
    g === "child" ? 0.9 :
    g === "teen" ? (isMale ? 1.3 : 1.0) :
    isMale ? 1.3 : 1.1;
  const b2Rda = Math.round(Math.max(b2TableVal, (targetCalories / 1000) * 0.6) * 10) / 10;

  const vitaminB2: Micronutrient = {
    name: "Vitamin B2 (Riboflavin)",
    unit: "mg",
    rda: b2Rda,
    rdaNote: `max(${b2TableVal}mg bảng, ${(targetCalories / 1000).toFixed(1)}×0.6/1000kcal)`,
    sources: ["Sữa", "Trứng", "Thịt nạc", "Hạnh nhân", "Măng tây"],
    icon: "🥛",
    category: "vitamin",
    deficiency: "Viêm miệng, nứt môi, mờ mắt",
    excess: "Nước tiểu vàng sáng (lành tính)",
    personalized: true,
  };

  // B3 — personalized by calories
  const b3TableVal =
    g === "child" ? 12 :
    g === "teen" ? (isMale ? 16 : 14) :
    isMale ? 16 : 14;
  const b3Rda = Math.round(Math.max(b3TableVal, (targetCalories / 1000) * 6.6));

  const vitaminB3: Micronutrient = {
    name: "Vitamin B3 (Niacin)",
    unit: "mg NE",
    rda: b3Rda,
    rdaNote: `max(${b3TableVal}mg bảng, ${(targetCalories / 1000).toFixed(1)}×6.6/1000kcal)`,
    upperLimit: g === "child" ? 20 : g === "teen" ? 30 : 35,
    upperLimitDisplay: g === "child" ? "20 mg" : g === "teen" ? "30 mg" : "35 mg",
    sources: ["Thịt gà", "Cá ngừ", "Lạc", "Nấm", "Ngũ cốc tăng cường"],
    icon: "🐟",
    category: "vitamin",
    deficiency: "Bệnh Pellagra (da, tiêu hóa, thần kinh)",
    excess: "Đỏ bừng mặt, tổn thương gan (liều bổ sung cao)",
    personalized: true,
  };

  const vitaminB5: Micronutrient = {
    name: "Vitamin B5 (Pantothenic acid)",
    unit: "mg",
    rda: g === "child" ? 4 : 5,
    sources: ["Thịt gà", "Trứng", "Nấm", "Bơ", "Khoai lang"],
    icon: "🥚",
    category: "vitamin",
    deficiency: "Tê bì, mệt mỏi, đau dạ dày (rất hiếm)",
    excess: "Tiêu chảy (liều rất cao)",
    personalized: false,
  };

  const vitaminB6: Micronutrient = {
    name: "Vitamin B6",
    unit: "mg",
    rda:
      g === "child" ? 1.0 :
      g === "teen" ? (isMale ? 1.3 : 1.2) :
      g === "young_adult" || g === "adult" ? 1.3 :
      isMale ? 1.7 : 1.5,
    upperLimit: g === "child" ? 60 : g === "teen" ? 80 : 100,
    upperLimitDisplay: g === "child" ? "60 mg" : g === "teen" ? "80 mg" : "100 mg",
    sources: ["Cá hồi", "Khoai tây", "Chuối", "Ức gà", "Đậu nành"],
    icon: "🍌",
    category: "vitamin",
    deficiency: "Viêm da, thiếu máu, rối loạn thần kinh",
    excess: "Bệnh thần kinh ngoại biên (bổ sung liều cao kéo dài)",
    personalized: false,
  };

  const vitaminB7: Micronutrient = {
    name: "Vitamin B7 (Biotin)",
    unit: "mcg",
    rda: g === "child" ? 20 : g === "teen" ? 25 : 30,
    sources: ["Gan bò", "Trứng", "Hạt hướng dương", "Khoai lang", "Hạnh nhân"],
    icon: "🥜",
    category: "vitamin",
    deficiency: "Rụng tóc, viêm da, rối loạn thần kinh",
    excess: "Không có UL; hiếm gặp độc tính",
    personalized: false,
  };

  const vitaminB9: Micronutrient = {
    name: "Vitamin B9 (Folate)",
    unit: "mcg DFE",
    rda: g === "child" ? 300 : 400,
    upperLimit: g === "child" ? 600 : g === "teen" ? 800 : 1000,
    upperLimitDisplay: g === "child" ? "600 mcg" : g === "teen" ? "800 mcg" : "1000 mcg",
    sources: ["Rau lá xanh", "Đậu lăng", "Măng tây", "Cam", "Bông cải xanh"],
    icon: "🥬",
    category: "vitamin",
    deficiency: "Thiếu máu hồng cầu khổng lồ, dị tật ống thần kinh thai nhi",
    excess: "Che giấu thiếu B12, tăng nguy cơ ung thư đại tràng (liều cao)",
    personalized: false,
  };

  const vitaminB12: Micronutrient = {
    name: "Vitamin B12",
    unit: "mcg",
    rda: g === "child" ? 1.8 : 2.4,
    sources: ["Thịt đỏ", "Cá", "Hải sản", "Sữa", "Trứng"],
    icon: "🥩",
    category: "vitamin",
    deficiency: "Thiếu máu, tổn thương thần kinh, mất trí nhớ",
    excess: "Hiếm gặp độc tính",
    personalized: false,
  };

  // ── MINERALS ────────────────────────────────────────────────────────────────

  const calcium: Micronutrient = {
    name: "Canxi",
    unit: "mg",
    rda:
      g === "child" || g === "teen" ? 1300 :
      g === "young_adult" || g === "adult" ? 1000 :
      g === "senior_early" ? (isMale ? 1000 : 1200) :
      1200,
    upperLimit: g === "child" || g === "teen" ? 3000 : g === "senior_early" || g === "senior" ? 2000 : 2500,
    upperLimitDisplay: g === "child" || g === "teen" ? "3000 mg" : g === "senior_early" || g === "senior" ? "2000 mg" : "2500 mg",
    sources: ["Sữa", "Phô mai", "Sữa chua", "Đậu phụ", "Cá nhỏ", "Rau cải"],
    icon: "🦴",
    category: "mineral",
    deficiency: "Còi xương, loãng xương, co giật cơ",
    excess: "Sỏi thận, vôi hóa mạch máu",
    personalized: false,
  };

  const phosphorus: Micronutrient = {
    name: "Phốt-pho",
    unit: "mg",
    rda: g === "child" || g === "teen" ? 1250 : 700,
    upperLimit: 4000,
    upperLimitDisplay: "4000 mg",
    sources: ["Sữa", "Thịt", "Cá", "Trứng", "Các loại hạt", "Ngũ cốc"],
    icon: "🐠",
    category: "mineral",
    deficiency: "Yếu cơ, đau xương, rối loạn hô hấp",
    excess: "Hạ canxi máu, bệnh xương",
    personalized: false,
  };

  const magnesium: Micronutrient = {
    name: "Magiê",
    unit: "mg",
    rda:
      g === "child" ? 240 :
      g === "teen" ? (isMale ? 410 : 360) :
      g === "young_adult" ? (isMale ? 400 : 310) :
      isMale ? 420 : 320,
    upperLimit: 350,
    upperLimitDisplay: "350 mg (bổ sung)",
    sources: ["Hạt bí ngô", "Rau bina", "Đậu đen", "Chocolate đen", "Hạnh nhân"],
    icon: "🌰",
    category: "mineral",
    deficiency: "Chuột rút, mất ngủ, lo âu, loạn nhịp tim",
    excess: "Tiêu chảy, buồn nôn (từ bổ sung)",
    personalized: false,
  };

  const sodium: Micronutrient = {
    name: "Natri",
    unit: "mg",
    rda: g === "child" ? 1200 : g === "senior_early" ? 1300 : g === "senior" ? 1200 : 1500,
    upperLimit: 2300,
    upperLimitDisplay: "2300 mg",
    sources: ["Muối ăn (hạn chế)", "Nước tương", "Phô mai", "Thực phẩm chế biến"],
    icon: "🧂",
    category: "mineral",
    deficiency: "Hạ natri máu, chuột rút, lú lẫn",
    excess: "Tăng huyết áp, bệnh tim mạch, thận",
    personalized: false,
  };

  const potassium: Micronutrient = {
    name: "Kali",
    unit: "mg",
    rda: g === "child" ? 2300 : g === "teen" ? (isMale ? 3000 : 2300) : isMale ? 3400 : 2600,
    sources: ["Chuối", "Khoai lang", "Rau bina", "Đậu trắng", "Cá hồi", "Cam"],
    icon: "🍌",
    category: "mineral",
    deficiency: "Yếu cơ, loạn nhịp tim, táo bón",
    excess: "Tăng kali máu, loạn nhịp tim nguy hiểm",
    personalized: false,
  };

  const chloride: Micronutrient = {
    name: "Clo",
    unit: "mg",
    rda: g === "child" ? 1800 : g === "senior" ? 1800 : 2300,
    upperLimit: 3600,
    upperLimitDisplay: "3600 mg",
    sources: ["Muối ăn", "Rong biển", "Cà chua", "Xà lách", "Rau cần tây"],
    icon: "🌊",
    category: "mineral",
    deficiency: "Mất cân bằng điện giải, kiềm hóa máu",
    excess: "Tăng huyết áp (liên quan natri)",
    personalized: false,
  };

  const iron: Micronutrient = {
    name: "Sắt",
    unit: "mg",
    rda:
      g === "child" ? 8 :
      g === "teen" ? (isMale ? 11 : 15) :
      g === "young_adult" || g === "adult" ? (isMale ? 8 : 18) :
      8,
    upperLimit: g === "child" ? 40 : 45,
    upperLimitDisplay: g === "child" ? "40 mg" : "45 mg",
    sources: ["Thịt đỏ", "Gan bò", "Đậu lăng", "Rau bina", "Hàu", "Đậu phụ"],
    icon: "🩸",
    category: "mineral",
    deficiency: "Thiếu máu thiếu sắt, mệt mỏi, kém tập trung",
    excess: "Tổn thương gan, tim, tuyến tụy (quá tải sắt)",
    personalized: false,
  };

  const zinc: Micronutrient = {
    name: "Kẽm",
    unit: "mg",
    rda: g === "child" ? 8 : g === "teen" ? (isMale ? 11 : 9) : isMale ? 11 : 8,
    upperLimit: g === "child" ? 23 : g === "teen" ? 34 : 40,
    upperLimitDisplay: g === "child" ? "23 mg" : g === "teen" ? "34 mg" : "40 mg",
    sources: ["Hàu", "Thịt bò", "Cua", "Đậu nành", "Hạt điều", "Bí ngô"],
    icon: "🦪",
    category: "mineral",
    deficiency: "Chậm lành vết thương, rụng tóc, suy miễn dịch",
    excess: "Buồn nôn, thiếu đồng, suy giảm miễn dịch",
    personalized: false,
  };

  const copper: Micronutrient = {
    name: "Đồng",
    unit: "mcg",
    rda: g === "child" ? 700 : g === "teen" ? 890 : 900,
    upperLimit: g === "child" ? 5000 : g === "teen" ? 8000 : 10000,
    upperLimitDisplay: g === "child" ? "5000 mcg" : g === "teen" ? "8000 mcg" : "10000 mcg",
    sources: ["Gan bò", "Hải sản", "Hạt điều", "Chocolate đen", "Nấm"],
    icon: "🍫",
    category: "mineral",
    deficiency: "Thiếu máu, loãng xương, rối loạn thần kinh",
    excess: "Tổn thương gan (bệnh Wilson)",
    personalized: false,
  };

  const manganese: Micronutrient = {
    name: "Mangan",
    unit: "mg",
    rda:
      g === "child" ? (isMale ? 1.9 : 1.6) :
      g === "teen" ? (isMale ? 2.2 : 1.6) :
      isMale ? 2.3 : 1.8,
    upperLimit: g === "child" ? 6 : g === "teen" ? 9 : 11,
    upperLimitDisplay: g === "child" ? "6 mg" : g === "teen" ? "9 mg" : "11 mg",
    sources: ["Gạo lứt", "Đậu nành", "Hạt dẻ", "Trà", "Rau lá xanh"],
    icon: "🍵",
    category: "mineral",
    deficiency: "Rối loạn chuyển hóa xương, sinh sản",
    excess: "Độc thần kinh (qua đường hô hấp nghề nghiệp)",
    personalized: false,
  };

  const iodine: Micronutrient = {
    name: "Iốt",
    unit: "mcg",
    rda: g === "child" ? 120 : 150,
    upperLimit: g === "child" ? 600 : g === "teen" ? 900 : 1100,
    upperLimitDisplay: g === "child" ? "600 mcg" : g === "teen" ? "900 mcg" : "1100 mcg",
    sources: ["Muối iốt", "Rong biển", "Cá biển", "Tôm", "Sữa"],
    icon: "🌿",
    category: "mineral",
    deficiency: "Bướu cổ, suy giáp, chậm phát triển trí tuệ",
    excess: "Cường giáp, suy giáp (liều rất cao)",
    personalized: false,
  };

  const selenium: Micronutrient = {
    name: "Selen",
    unit: "mcg",
    rda: g === "child" ? 40 : 55,
    upperLimit: g === "child" ? 280 : 400,
    upperLimitDisplay: g === "child" ? "280 mcg" : "400 mcg",
    sources: ["Hạt Brazil", "Cá ngừ", "Thịt lợn", "Trứng", "Tôm"],
    icon: "🥜",
    category: "mineral",
    deficiency: "Bệnh Keshan (tim), suy giảm miễn dịch",
    excess: "Selenosis: rụng tóc, móng giòn, buồn nôn",
    personalized: false,
  };

  const molybdenum: Micronutrient = {
    name: "Molybden",
    unit: "mcg",
    rda: g === "child" ? 34 : g === "teen" ? 43 : 45,
    upperLimit: g === "child" ? 1100 : g === "teen" ? 1700 : 2000,
    upperLimitDisplay: g === "child" ? "1100 mcg" : g === "teen" ? "1700 mcg" : "2000 mcg",
    sources: ["Các loại đậu", "Ngũ cốc nguyên hạt", "Hạt", "Sữa"],
    icon: "🫘",
    category: "mineral",
    deficiency: "Rất hiếm; rối loạn chuyển hóa sulfur",
    excess: "Đau khớp, podagra (liều rất cao)",
    personalized: false,
  };

  const chromium: Micronutrient = {
    name: "Crom",
    unit: "mcg",
    rda:
      g === "child" ? (isMale ? 25 : 21) :
      g === "teen" ? (isMale ? 35 : 24) :
      g === "young_adult" || g === "adult" ? (isMale ? 35 : 25) :
      isMale ? 30 : 20,
    sources: ["Thịt bò", "Bông cải xanh", "Hạt nho", "Ngũ cốc nguyên hạt", "Bia men"],
    icon: "🥩",
    category: "mineral",
    deficiency: "Kháng insulin, rối loạn chuyển hóa glucose",
    excess: "Tổn thương thận, gan (bổ sung liều cao)",
    personalized: false,
  };

  const fluoride: Micronutrient = {
    name: "Fluoride",
    unit: "mg",
    rda: g === "child" ? 2 : g === "teen" ? 3 : isMale ? 4 : 3,
    upperLimit: 10,
    upperLimitDisplay: "10 mg",
    sources: ["Nước fluoride hóa", "Cá biển", "Trà", "Rau biển"],
    icon: "💧",
    category: "mineral",
    deficiency: "Sâu răng, loãng xương",
    excess: "Fluorosis răng và xương",
    personalized: false,
  };

  // ── AMINO ACIDS ─────────────────────────────────────────────────────────────
  // WHO/FAO/UNU 2007 values in mg/kg/day
  // rda = round(mg_per_kg × weightKg) / 1000 → grams

  const isChild = g === "child";

  function aminoAcid(
    name: string,
    icon: string,
    adultMgKg: number,
    childMultiplier: number,
    sources: string[]
  ): Micronutrient {
    const mgPerKg = isChild ? Math.round(adultMgKg * childMultiplier) : adultMgKg;
    const rdaG = Math.round(mgPerKg * weightKg) / 1000;
    return {
      name,
      unit: "g",
      rda: rdaG,
      rdaNote: `${mgPerKg} mg/kg thể trọng`,
      sources,
      icon,
      category: "amino_acid",
      deficiency: "Suy giảm tổng hợp protein, mệt mỏi, mất cơ",
      excess: "Hiếm gặp từ thực phẩm; stress thận từ bổ sung quá mức",
      personalized: true,
    };
  }

  const histidine    = aminoAcid("Histidine",                   "🔬", 10, 1.5, ["Thịt bò", "Thịt lợn", "Cá ngừ", "Đậu nành", "Lúa mì nguyên hạt"]);
  const isoleucine   = aminoAcid("Isoleucine",                  "💪", 20, 1.3, ["Thịt bò", "Thịt gà", "Trứng", "Cá hồi", "Đậu lăng"]);
  const leucine      = aminoAcid("Leucine",                     "🏋️", 42, 1.3, ["Thịt gà", "Cá hồi", "Trứng", "Sữa", "Đậu nành"]);
  const lysine       = aminoAcid("Lysine",                      "🧬", 38, 1.3, ["Thịt đỏ", "Cá", "Trứng", "Đậu nành", "Phô mai"]);
  const methionine   = aminoAcid("Methionine (tổng SAA)",       "⚗️",  19, 1.3, ["Thịt bò", "Cá ngừ", "Trứng", "Hạt Brazil", "Phô mai"]);
  const phenylalanine = aminoAcid("Phenylalanine (tổng AAA)",   "🔭", 33, 1.3, ["Thịt gà", "Sữa", "Đậu phộng", "Đậu nành", "Hạnh nhân"]);
  const threonine    = aminoAcid("Threonine",                   "🌱", 15, 1.3, ["Thịt bò", "Gà", "Đậu nành", "Phô mai", "Hạt bí ngô"]);
  const tryptophan   = aminoAcid("Tryptophan",                  "🧠",  5, 1.3, ["Gà tây", "Sữa", "Phô mai", "Hạt điều", "Trứng"]);
  const valine       = aminoAcid("Valine",                      "⚡", 24, 1.3, ["Thịt bò", "Thịt gà", "Cá hồi", "Đậu nành", "Sữa"]);

  // ── FATTY ACIDS ─────────────────────────────────────────────────────────────

  const omega6Linoleic: Micronutrient = {
    name: "Linoleic acid (Omega-6)",
    unit: "g",
    rda:
      g === "child" ? (isMale ? 12 : 10) :
      g === "teen" ? (isMale ? 16 : 11) :
      g === "young_adult" || g === "adult" ? (isMale ? 17 : 12) :
      isMale ? 14 : 11,
    sources: ["Dầu đậu nành", "Dầu ngô", "Dầu hướng dương", "Hạt hướng dương", "Đậu phộng"],
    icon: "🌽",
    category: "fatty_acid",
    subgroup: "Omega-6",
    deficiency: "Viêm da, rụng tóc, chậm lành vết thương",
    excess: "Viêm mạn tính nếu mất cân bằng với Omega-3",
    personalized: false,
  };

  const omega3ALA: Micronutrient = {
    name: "Alpha-linolenic acid (ALA – Omega-3)",
    unit: "g",
    rda: g === "child" ? 1.2 : g === "teen" ? (isMale ? 1.6 : 1.1) : isMale ? 1.6 : 1.1,
    sources: ["Hạt lanh", "Hạt chia", "Quả óc chó", "Dầu cải", "Đậu nành"],
    icon: "🌿",
    category: "fatty_acid",
    subgroup: "Omega-3",
    deficiency: "Giảm chức năng thần kinh và thị giác",
    excess: "Hiếm gặp từ thực phẩm",
    personalized: false,
  };

  const epadha: Micronutrient = {
    name: "EPA+DHA (Omega-3 chuỗi dài)",
    unit: "mg",
    rda: 250,
    suggestion: "250–500 mg/ngày cho sức khỏe tim mạch (WHO/FAO 2010)",
    upperLimitDisplay: ">3 g/ngày có thể làm loãng máu",
    sources: ["Cá hồi", "Cá thu", "Cá mòi", "Cá ngừ", "Tảo biển"],
    icon: "🐟",
    category: "fatty_acid",
    subgroup: "Omega-3 chuỗi dài",
    deficiency: "Viêm mạn, suy giảm chức năng tim và não",
    excess: "Loãng máu, ức chế miễn dịch (>3 g/ngày)",
    personalized: false,
  };

  // ── BIOACTIVE COMPOUNDS ──────────────────────────────────────────────────────

  const cholineRda = g === "child" ? 375 : g === "teen" ? (isMale ? 550 : 400) : isMale ? 550 : 425;

  const choline: Micronutrient = {
    name: "Choline",
    unit: "mg",
    rda: cholineRda,
    sources: ["Trứng (lòng đỏ)", "Gan bò", "Thịt bò", "Cá hồi", "Đậu nành"],
    icon: "🥚",
    category: "bioactive",
    subgroup: "Thiết yếu có điều kiện",
    deficiency: "Tổn thương gan, rối loạn thần kinh",
    excess: "Mùi cá thể (trimethylamine), hạ huyết áp (liều rất cao)",
    personalized: false,
  };

  const carnitine: Micronutrient = {
    name: "Carnitine",
    unit: "mg",
    rda: null,
    suggestion: "Cơ thể tự tổng hợp đủ. Bổ sung 500–2000 mg/ngày cho người ăn thuần chay hoặc vận động viên",
    sources: ["Thịt bò", "Thịt cừu", "Thịt lợn", "Sữa", "Cá"],
    icon: "🥩",
    category: "bioactive",
    subgroup: "Vận chuyển chất béo",
  };

  const taurine: Micronutrient = {
    name: "Taurine",
    unit: "mg",
    rda: null,
    suggestion: "Quan trọng cho trẻ sơ sinh và trẻ nhỏ. Người lớn tự tổng hợp; nguồn chính từ thịt, cá, sữa",
    sources: ["Thịt bò", "Cá", "Hải sản", "Sữa", "Lòng đỏ trứng"],
    icon: "🐟",
    category: "bioactive",
    subgroup: "Acid amin có điều kiện",
  };

  const creatine: Micronutrient = {
    name: "Creatine",
    unit: "g",
    rda: null,
    suggestion: "3–5 g/ngày cho vận động viên sức mạnh; cơ thể tổng hợp ~1 g/ngày",
    sources: ["Thịt đỏ", "Thịt lợn", "Thịt gà", "Cá hồi", "Cá ngừ"],
    icon: "💪",
    category: "bioactive",
    subgroup: "Phosphagen",
  };

  const coq10: Micronutrient = {
    name: "CoQ10 (Coenzyme Q10)",
    unit: "mg",
    rda: null,
    suggestion: "100–200 mg/ngày hỗ trợ năng lượng tế bào; quan trọng cho người dùng statin",
    sources: ["Thịt bò", "Cá hồi", "Đậu phộng", "Bông cải xanh", "Rau bina"],
    icon: "⚡",
    category: "bioactive",
    subgroup: "Chống oxy hóa ty thể",
  };

  const epa: Micronutrient = {
    name: "EPA (Eicosapentaenoic acid)",
    unit: "mg",
    rda: null,
    suggestion: "250–500 mg EPA+DHA/ngày (WHO). 1000 mg/ngày cho tim mạch",
    sources: ["Cá hồi", "Cá thu", "Cá mòi", "Cá trích", "Dầu cá"],
    icon: "🐠",
    category: "bioactive",
    subgroup: "Omega-3 chuỗi dài",
  };

  const dha: Micronutrient = {
    name: "DHA (Docosahexaenoic acid)",
    unit: "mg",
    rda: null,
    suggestion: "250–500 mg EPA+DHA/ngày (WHO). Đặc biệt quan trọng cho não và thị giác",
    sources: ["Cá hồi", "Cá thu", "Tảo biển", "Dầu cá", "Cá ngừ"],
    icon: "🧠",
    category: "bioactive",
    subgroup: "Omega-3 chuỗi dài",
  };

  const lutein: Micronutrient = {
    name: "Lutein",
    unit: "mg",
    rda: null,
    suggestion: "6–10 mg/ngày cho sức khỏe điểm vàng mắt (khuyến nghị lâm sàng)",
    sources: ["Rau cải xoăn", "Rau bina", "Ngô", "Ớt xanh", "Lòng đỏ trứng"],
    icon: "👁️",
    category: "bioactive",
    subgroup: "Carotenoid",
  };

  const zeaxanthin: Micronutrient = {
    name: "Zeaxanthin",
    unit: "mg",
    rda: null,
    suggestion: "2 mg/ngày cùng lutein bảo vệ điểm vàng mắt",
    sources: ["Ngô", "Ớt đỏ", "Lòng đỏ trứng", "Rau cải xanh", "Kiwi"],
    icon: "🌽",
    category: "bioactive",
    subgroup: "Carotenoid",
  };

  const lycopene: Micronutrient = {
    name: "Lycopene",
    unit: "mg",
    rda: null,
    suggestion: "8–21 mg/ngày từ cà chua nấu chín, hỗ trợ chống oxy hóa và tuyến tiền liệt",
    sources: ["Cà chua nấu chín", "Nước cà chua", "Dưa hấu", "Ổi đỏ", "Ớt đỏ"],
    icon: "🍅",
    category: "bioactive",
    subgroup: "Carotenoid",
  };

  const polyphenols: Micronutrient = {
    name: "Polyphenols",
    unit: "mg",
    rda: null,
    suggestion: "1000–2000 mg/ngày từ đa dạng trái cây, rau, trà, cà phê",
    sources: ["Trà xanh", "Cà phê", "Việt quất", "Táo", "Nho", "Socola đen"],
    icon: "🍇",
    category: "bioactive",
    subgroup: "Chống oxy hóa thực vật",
  };

  const flavonoids: Micronutrient = {
    name: "Flavonoids",
    unit: "mg",
    rda: null,
    suggestion: "Ăn đa dạng rau quả nhiều màu sắc để đạt đủ các phân nhóm flavonoid",
    sources: ["Táo", "Hành tây", "Trà xanh", "Cam quýt", "Việt quất"],
    icon: "🫐",
    category: "bioactive",
    subgroup: "Chống oxy hóa thực vật",
  };

  const probiotics: Micronutrient = {
    name: "Probiotics",
    unit: "CFU",
    rda: null,
    suggestion: "1–10 tỷ CFU/ngày; chủng Lactobacillus và Bifidobacterium phổ biến nhất",
    sources: ["Sữa chua", "Kefir", "Kim chi", "Dưa cải muối", "Miso", "Kombucha"],
    icon: "🦠",
    category: "bioactive",
    subgroup: "Sức khỏe đường ruột",
  };

  const prebiotics: Micronutrient = {
    name: "Prebiotics (Chất xơ prebiotics)",
    unit: "g",
    rda: null,
    suggestion: "5–20 g/ngày từ thực phẩm tự nhiên (tỏi, hành, chuối, yến mạch, măng tây)",
    sources: ["Tỏi", "Hành tây", "Chuối chưa chín", "Yến mạch", "Măng tây"],
    icon: "🧅",
    category: "bioactive",
    subgroup: "Sức khỏe đường ruột",
  };

  return [
    // Vitamins (13)
    vitaminA, vitaminD, vitaminE, vitaminK, vitaminC,
    vitaminB1, vitaminB2, vitaminB3, vitaminB5, vitaminB6, vitaminB7, vitaminB9, vitaminB12,
    // Minerals (15)
    calcium, phosphorus, magnesium, sodium, potassium, chloride,
    iron, zinc, copper, manganese, iodine, selenium, molybdenum, chromium, fluoride,
    // Amino acids (9)
    histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan, valine,
    // Fatty acids (3)
    omega6Linoleic, omega3ALA, epadha,
    // Bioactives (14)
    choline, carnitine, taurine, creatine, coq10,
    epa, dha, lutein, zeaxanthin, lycopene,
    polyphenols, flavonoids, probiotics, prebiotics,
  ];
}
