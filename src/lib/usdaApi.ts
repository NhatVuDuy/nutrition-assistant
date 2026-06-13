// USDA FoodData Central API client
// Free public API: https://fdc.nal.usda.gov/
// DEMO_KEY: 30 requests/hour, 50/day. Get your own free key at fdc.nal.usda.gov/api-guide.html

const API_BASE = "https://api.nal.usda.gov/fdc/v1";

export function getApiKey(): string {
  return localStorage.getItem("usda_api_key") || "DEMO_KEY";
}

export function saveApiKey(key: string) {
  if (key.trim()) localStorage.setItem("usda_api_key", key.trim());
  else localStorage.removeItem("usda_api_key");
}

// ── TYPES ────────────────────────────────────────────────────────────────────

export interface SearchFood {
  fdcId: number;
  description: string;
  dataType: string;
  foodCategory?: string;
  brandOwner?: string;
}

export interface FoodNutrientRaw {
  nutrient?: { id: number; name: string; unitName: string };
  nutrientId?: number;
  amount?: number;
  median?: number; // Foundation Foods use median instead of amount
  value?: number;
}

export interface FoodDetail {
  fdcId: number;
  description: string;
  dataType: string;
  publicationDate?: string;
  foodCategory?: string | { description: string };
  foodNutrients: FoodNutrientRaw[];
}

export type NutrientCategory = "macro" | "vitamin" | "mineral" | "amino_acid" | "fatty_acid" | "bioactive";

export interface NutrientDef {
  usdaId: number;
  name: string;
  unit: string;
  category: NutrientCategory;
  icon: string;
}

// ── NUTRIENT MAP: USDA nutrient IDs → display info ───────────────────────────
// IDs from USDA SR Legacy / Foundation Foods schema
// Reference: https://fdc.nal.usda.gov/data-documentation.html

export const NUTRIENT_MAP: NutrientDef[] = [
  // MACROS
  { usdaId: 1008, name: "Năng lượng",              unit: "kcal",    category: "macro",      icon: "🔥" },
  { usdaId: 1003, name: "Protein",                  unit: "g",       category: "macro",      icon: "💪" },
  { usdaId: 1005, name: "Carbohydrate",             unit: "g",       category: "macro",      icon: "🌾" },
  { usdaId: 1004, name: "Chất béo tổng",            unit: "g",       category: "macro",      icon: "🧈" },
  { usdaId: 1079, name: "Chất xơ",                  unit: "g",       category: "macro",      icon: "🥦" },
  { usdaId: 2000, name: "Đường",                    unit: "g",       category: "macro",      icon: "🍬" },

  // VITAMINS
  { usdaId: 1106, name: "Vitamin A",                unit: "mcg RAE", category: "vitamin",    icon: "🥕" },
  { usdaId: 1110, name: "Vitamin D",                unit: "IU",      category: "vitamin",    icon: "☀️" },
  { usdaId: 1109, name: "Vitamin E",                unit: "mg",      category: "vitamin",    icon: "🌻" },
  { usdaId: 1185, name: "Vitamin K",                unit: "mcg",     category: "vitamin",    icon: "🥦" },
  { usdaId: 1162, name: "Vitamin C",                unit: "mg",      category: "vitamin",    icon: "🍊" },
  { usdaId: 1165, name: "Vitamin B1 (Thiamine)",    unit: "mg",      category: "vitamin",    icon: "🌾" },
  { usdaId: 1166, name: "Vitamin B2 (Riboflavin)",  unit: "mg",      category: "vitamin",    icon: "🥛" },
  { usdaId: 1167, name: "Vitamin B3 (Niacin)",      unit: "mg NE",   category: "vitamin",    icon: "🐟" },
  { usdaId: 1170, name: "Vitamin B5 (Pantothenic)", unit: "mg",      category: "vitamin",    icon: "🥚" },
  { usdaId: 1175, name: "Vitamin B6",               unit: "mg",      category: "vitamin",    icon: "🍌" },
  { usdaId: 1176, name: "Vitamin B7 (Biotin)",      unit: "mcg",     category: "vitamin",    icon: "🥜" },
  { usdaId: 1190, name: "Vitamin B9 (Folate DFE)",  unit: "mcg DFE", category: "vitamin",    icon: "🥬" },
  { usdaId: 1178, name: "Vitamin B12",              unit: "mcg",     category: "vitamin",    icon: "🥩" },

  // MINERALS
  { usdaId: 1087, name: "Canxi (Ca)",               unit: "mg",      category: "mineral",    icon: "🦴" },
  { usdaId: 1091, name: "Phốt-pho (P)",             unit: "mg",      category: "mineral",    icon: "🐠" },
  { usdaId: 1090, name: "Magiê (Mg)",               unit: "mg",      category: "mineral",    icon: "🌰" },
  { usdaId: 1093, name: "Natri (Na)",               unit: "mg",      category: "mineral",    icon: "🧂" },
  { usdaId: 1092, name: "Kali (K)",                 unit: "mg",      category: "mineral",    icon: "🍌" },
  { usdaId: 1088, name: "Clo (Cl)",                 unit: "mg",      category: "mineral",    icon: "🌊" },
  { usdaId: 1089, name: "Sắt (Fe)",                 unit: "mg",      category: "mineral",    icon: "🩸" },
  { usdaId: 1095, name: "Kẽm (Zn)",                 unit: "mg",      category: "mineral",    icon: "🦪" },
  { usdaId: 1098, name: "Đồng (Cu)",                unit: "mg",      category: "mineral",    icon: "🍫" },
  { usdaId: 1101, name: "Mangan (Mn)",              unit: "mg",      category: "mineral",    icon: "🍵" },
  { usdaId: 1100, name: "Iốt (I)",                  unit: "mcg",     category: "mineral",    icon: "🌿" },
  { usdaId: 1103, name: "Selen (Se)",               unit: "mcg",     category: "mineral",    icon: "🥜" },
  { usdaId: 1102, name: "Molybden (Mo)",            unit: "mcg",     category: "mineral",    icon: "🫘" },
  { usdaId: 1096, name: "Crom (Cr)",                unit: "mcg",     category: "mineral",    icon: "🥩" },
  { usdaId: 1099, name: "Fluoride (F)",             unit: "mcg",     category: "mineral",    icon: "💧" },

  // AMINO ACIDS
  { usdaId: 1221, name: "Histidine",                unit: "g",       category: "amino_acid", icon: "🔬" },
  { usdaId: 1212, name: "Isoleucine",               unit: "g",       category: "amino_acid", icon: "💪" },
  { usdaId: 1213, name: "Leucine",                  unit: "g",       category: "amino_acid", icon: "🏋️" },
  { usdaId: 1214, name: "Lysine",                   unit: "g",       category: "amino_acid", icon: "🧬" },
  { usdaId: 1215, name: "Methionine",               unit: "g",       category: "amino_acid", icon: "⚗️" },
  { usdaId: 1217, name: "Phenylalanine",            unit: "g",       category: "amino_acid", icon: "🔭" },
  { usdaId: 1211, name: "Threonine",                unit: "g",       category: "amino_acid", icon: "🌱" },
  { usdaId: 1210, name: "Tryptophan",               unit: "g",       category: "amino_acid", icon: "🧠" },
  { usdaId: 1219, name: "Valine",                   unit: "g",       category: "amino_acid", icon: "⚡" },

  // FATTY ACIDS
  { usdaId: 1258, name: "Chất béo bão hòa",         unit: "g",       category: "fatty_acid", icon: "🧈" },
  { usdaId: 1269, name: "Linoleic acid (Omega-6)",   unit: "g",       category: "fatty_acid", icon: "🌽" },
  { usdaId: 1404, name: "Alpha-linolenic (ALA, Ω-3)",unit: "g",       category: "fatty_acid", icon: "🌿" },
  { usdaId: 1278, name: "EPA (20:5 n-3)",           unit: "g",       category: "fatty_acid", icon: "🐠" },
  { usdaId: 1272, name: "DHA (22:6 n-3)",           unit: "g",       category: "fatty_acid", icon: "🧠" },

  // BIOACTIVES (available in USDA)
  { usdaId: 1180, name: "Choline",                  unit: "mg",      category: "bioactive",  icon: "🥚" },
  { usdaId: 1107, name: "Beta-carotene",            unit: "mcg",     category: "bioactive",  icon: "🥕" },
  { usdaId: 1122, name: "Lycopene",                 unit: "mcg",     category: "bioactive",  icon: "🍅" },
  { usdaId: 1138, name: "Lutein + Zeaxanthin",      unit: "mcg",     category: "bioactive",  icon: "👁️" },
  { usdaId: 1108, name: "Alpha-carotene",           unit: "mcg",     category: "bioactive",  icon: "🥕" },
];

// Reference adult RDA (male, 30y, 2000kcal) for % display
export const REFERENCE_RDA: Partial<Record<number, number>> = {
  1003: 56, 1005: 275, 1004: 78, 1079: 28,
  1106: 900, 1110: 600, 1109: 15, 1185: 120, 1162: 90,
  1165: 1.2, 1166: 1.3, 1167: 16, 1170: 5, 1175: 1.3,
  1176: 30, 1190: 400, 1178: 2.4,
  1087: 1000, 1091: 700, 1090: 420, 1093: 1500, 1092: 3400,
  1089: 8, 1095: 11, 1098: 0.9, 1101: 2.3, 1103: 55, 1180: 550,
};

// ── VIETNAMESE FOOD TRANSLATIONS ─────────────────────────────────────────────

const VN_TRANSLATIONS: Record<string, string> = {
  "gà": "chicken", "ức gà": "chicken breast", "đùi gà": "chicken thigh leg",
  "thịt bò": "beef", "thịt heo": "pork", "thịt lợn": "pork",
  "cá hồi": "salmon", "cá ngừ": "tuna", "cá thu": "mackerel",
  "cá rô phi": "tilapia", "cá chép": "carp", "cá basa": "catfish",
  "tôm": "shrimp", "cua": "crab", "hàu": "oyster", "mực": "squid",
  "trứng": "egg", "trứng gà": "chicken egg",
  "sữa": "milk", "sữa chua": "yogurt", "phô mai": "cheese",
  "đậu phụ": "tofu", "đậu nành": "soybean", "đậu đỏ": "red beans",
  "gạo": "rice raw", "cơm": "rice cooked", "gạo lứt": "brown rice",
  "bún": "rice noodles", "phở": "rice noodles",
  "bánh mì": "bread white",
  "yến mạch": "oats",
  "khoai lang": "sweet potato", "khoai tây": "potato",
  "bông cải xanh": "broccoli", "súp lơ": "cauliflower",
  "rau muống": "water spinach", "cải bó xôi": "spinach",
  "cà rốt": "carrot", "cà chua": "tomato", "dưa chuột": "cucumber",
  "hành tây": "onion", "tỏi": "garlic", "gừng": "ginger",
  "chuối": "banana", "cam": "orange", "táo": "apple", "ổi": "guava",
  "dưa hấu": "watermelon", "bơ": "avocado", "xoài": "mango",
  "nho": "grapes", "dâu tây": "strawberry",
  "hạnh nhân": "almond", "hạt điều": "cashew nuts",
  "hạt óc chó": "walnut", "hạt bí": "pumpkin seeds",
  "dầu ô liu": "olive oil", "dầu dừa": "coconut oil",
  "mật ong": "honey", "đường": "sugar",
};

export function translateQuery(q: string): string {
  const lower = q.toLowerCase().trim();
  return VN_TRANSLATIONS[lower] || q;
}

// ── API FUNCTIONS ─────────────────────────────────────────────────────────────

export async function searchFoods(query: string): Promise<SearchFood[]> {
  const translated = translateQuery(query);
  const url = new URL(`${API_BASE}/foods/search`);
  url.searchParams.set("query", translated);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("dataType", "Foundation,SR Legacy");
  url.searchParams.set("pageSize", "15");

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(body?.error?.message || `API lỗi ${res.status}`);
  }
  const data = await res.json() as { foods?: SearchFood[] };
  return data.foods || [];
}

export async function getFoodDetail(fdcId: number): Promise<FoodDetail> {
  const url = `${API_BASE}/food/${fdcId}?api_key=${getApiKey()}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(body?.error?.message || `API lỗi ${res.status}`);
  }
  return res.json() as Promise<FoodDetail>;
}

export function extractValue(food: FoodDetail, usdaId: number): number | null {
  const fn = food.foodNutrients.find(
    (n) => (n.nutrient?.id ?? n.nutrientId) === usdaId
  );
  if (!fn) return null;
  // Foundation Foods use `median`; SR Legacy uses `amount`
  const v = fn.amount ?? fn.median ?? fn.value;
  return v != null ? v : null;
}

export function formatValue(v: number, unit: string): string {
  if (unit === "kcal" || v >= 10) return Math.round(v).toString();
  if (v >= 1) return v.toFixed(2);
  if (v >= 0.01) return v.toFixed(3);
  return v.toFixed(4);
}
