import type { MacroTargets } from "./types";

export interface FoodItem {
  id: string;
  name: string;
  icon: string;
  unitName: string;   // display unit label
  unitGrams: number;  // grams per unit
  // per 100g
  cal: number;
  p: number;   // protein
  c: number;   // carbs
  f: number;   // fat
  // micronutrients per 100g (0 = negligible)
  vitA: number; vitC: number; vitD: number; vitB12: number;
  folate: number; ca: number; fe: number; zn: number;
  mg_: number; k: number; epadha: number; omega3: number;
}

const F: Record<string, FoodItem> = {
  // ── PROTEINS ────────────────────────────────────────────────────────
  chicken: { id:"chicken", name:"Ức gà luộc", icon:"🍗", unitName:"lạng", unitGrams:100,
    cal:165, p:31, c:0, f:3.6,   vitA:9,  vitC:0,  vitD:5,   vitB12:0.30, folate:4,  ca:11, fe:1.0, zn:1.0, mg_:29, k:256, epadha:60,  omega3:0.1 },
  beef:    { id:"beef",    name:"Thịt bò nạc", icon:"🥩", unitName:"lạng", unitGrams:100,
    cal:250, p:26, c:0, f:15,    vitA:0,  vitC:0,  vitD:0,   vitB12:2.60, folate:9,  ca:18, fe:2.6, zn:6.3, mg_:22, k:318, epadha:30,  omega3:0.1 },
  pork:    { id:"pork",    name:"Thịt heo nạc", icon:"🥩", unitName:"lạng", unitGrams:100,
    cal:242, p:27, c:0, f:14,    vitA:0,  vitC:0.6,vitD:0,   vitB12:0.70, folate:5,  ca:19, fe:1.1, zn:3.0, mg_:26, k:423, epadha:30,  omega3:0.1 },
  salmon:  { id:"salmon",  name:"Cá hồi",       icon:"🐟", unitName:"lạng", unitGrams:100,
    cal:208, p:20, c:0, f:13,    vitA:12, vitC:0,  vitD:447, vitB12:3.20, folate:25, ca:9,  fe:0.8, zn:0.6, mg_:27, k:490, epadha:2260,omega3:0.5 },
  tuna:    { id:"tuna",    name:"Cá ngừ",        icon:"🐟", unitName:"lạng", unitGrams:100,
    cal:132, p:29, c:0, f:1.3,   vitA:20, vitC:0,  vitD:40,  vitB12:2.10, folate:2,  ca:10, fe:1.0, zn:0.7, mg_:64, k:444, epadha:300, omega3:0.2 },
  tilapia: { id:"tilapia", name:"Cá rô phi",     icon:"🐠", unitName:"lạng", unitGrams:100,
    cal:96,  p:20, c:0, f:2.0,   vitA:0,  vitC:0,  vitD:0,   vitB12:1.00, folate:24, ca:10, fe:0.6, zn:0.3, mg_:27, k:302, epadha:200, omega3:0.1 },
  shrimp:  { id:"shrimp",  name:"Tôm",           icon:"🦐", unitName:"lạng", unitGrams:100,
    cal:99,  p:24, c:0, f:0.3,   vitA:0,  vitC:0,  vitD:0,   vitB12:1.10, folate:19, ca:70, fe:0.5, zn:1.1, mg_:37, k:259, epadha:500, omega3:0.1 },
  egg:     { id:"egg",     name:"Trứng gà",      icon:"🥚", unitName:"quả", unitGrams:60,
    cal:155, p:13, c:1.1,f:11,   vitA:160,vitC:0,  vitD:87,  vitB12:0.89, folate:47, ca:56, fe:1.8, zn:1.3, mg_:12, k:138, epadha:80,  omega3:0.1 },
  tofu:    { id:"tofu",    name:"Đậu phụ",       icon:"🫘", unitName:"g",   unitGrams:1,
    cal:76,  p:8,  c:1.9,f:4.8,  vitA:0,  vitC:0.1,vitD:0,   vitB12:0,    folate:15, ca:350,fe:2.7, zn:0.8, mg_:30, k:121, epadha:0,   omega3:0.3 },

  // ── CARBS ────────────────────────────────────────────────────────────
  white_rice:  { id:"white_rice",  name:"Cơm trắng",    icon:"🍚", unitName:"chén", unitGrams:180,
    cal:130, p:2.7,c:28,  f:0.3,  vitA:0, vitC:0, vitD:0, vitB12:0,    folate:3,  ca:3,  fe:0.2, zn:0.5, mg_:12, k:35,  epadha:0, omega3:0 },
  brown_rice:  { id:"brown_rice",  name:"Cơm gạo lứt",  icon:"🍚", unitName:"chén", unitGrams:180,
    cal:123, p:2.7,c:26,  f:1.0,  vitA:0, vitC:0, vitD:0, vitB12:0,    folate:4,  ca:10, fe:0.5, zn:0.6, mg_:44, k:79,  epadha:0, omega3:0 },
  noodle:      { id:"noodle",      name:"Bún/Phở",       icon:"🍜", unitName:"tô",   unitGrams:200,
    cal:108, p:1.8,c:25,  f:0.1,  vitA:0, vitC:0, vitD:0, vitB12:0,    folate:2,  ca:7,  fe:0.3, zn:0.3, mg_:13, k:14,  epadha:0, omega3:0 },
  bread:       { id:"bread",       name:"Bánh mì",       icon:"🥖", unitName:"ổ nhỏ",unitGrams:80,
    cal:265, p:9,  c:49,  f:3.2,  vitA:0, vitC:0, vitD:0, vitB12:0,    folate:107,ca:107,fe:2.6, zn:0.9, mg_:28, k:126, epadha:0, omega3:0 },
  oats:        { id:"oats",        name:"Yến mạch",      icon:"🥣", unitName:"chén", unitGrams:80,
    cal:389, p:17, c:66,  f:7,    vitA:0, vitC:0, vitD:0, vitB12:0,    folate:56, ca:54, fe:4.7, zn:4.0, mg_:177,k:429, epadha:0, omega3:0.1},
  sweet_potato:{ id:"sweet_potato",name:"Khoai lang",    icon:"🍠", unitName:"củ",   unitGrams:150,
    cal:86,  p:1.6,c:20,  f:0.1,  vitA:961,vitC:2.4,vitD:0,vitB12:0,   folate:11, ca:30, fe:0.6, zn:0.3, mg_:25, k:337, epadha:0, omega3:0 },

  // ── VEGETABLES ───────────────────────────────────────────────────────
  broccoli:    { id:"broccoli",    name:"Bông cải xanh", icon:"🥦", unitName:"g", unitGrams:1,
    cal:34,  p:2.8,c:7,   f:0.4,  vitA:31, vitC:89, vitD:0, vitB12:0,   folate:63, ca:47, fe:0.7, zn:0.4, mg_:21, k:316, epadha:0, omega3:0.1},
  spinach:     { id:"spinach",     name:"Rau cải bó xôi",icon:"🥬", unitName:"g", unitGrams:1,
    cal:23,  p:2.9,c:3.6, f:0.4,  vitA:469,vitC:28, vitD:0, vitB12:0,   folate:194,ca:99, fe:2.7, zn:0.5, mg_:79, k:558, epadha:0, omega3:0.1},
  morning_glory:{ id:"morning_glory",name:"Rau muống",   icon:"🥬", unitName:"g", unitGrams:1,
    cal:19,  p:2.6,c:3.1, f:0.2,  vitA:315,vitC:55, vitD:0, vitB12:0,   folate:57, ca:77, fe:2.5, zn:0.3, mg_:71, k:312, epadha:0, omega3:0 },
  carrot:      { id:"carrot",      name:"Cà rốt",        icon:"🥕", unitName:"củ",unitGrams:100,
    cal:41,  p:0.9,c:10,  f:0.2,  vitA:835,vitC:5.9,vitD:0, vitB12:0,   folate:19, ca:33, fe:0.3, zn:0.2, mg_:12, k:320, epadha:0, omega3:0 },
  tomato:      { id:"tomato",      name:"Cà chua",       icon:"🍅", unitName:"quả",unitGrams:120,
    cal:18,  p:0.9,c:3.9, f:0.2,  vitA:42, vitC:14, vitD:0, vitB12:0,   folate:15, ca:10, fe:0.3, zn:0.2, mg_:11, k:237, epadha:0, omega3:0 },
  cucumber:    { id:"cucumber",    name:"Dưa chuột",     icon:"🥒", unitName:"quả",unitGrams:200,
    cal:15,  p:0.7,c:3.6, f:0.1,  vitA:5,  vitC:2.8,vitD:0, vitB12:0,   folate:7,  ca:16, fe:0.3, zn:0.2, mg_:13, k:147, epadha:0, omega3:0 },
  cabbage:     { id:"cabbage",     name:"Cải bắp",       icon:"🥬", unitName:"g", unitGrams:1,
    cal:25,  p:1.3,c:6,   f:0.1,  vitA:5,  vitC:36, vitD:0, vitB12:0,   folate:43, ca:40, fe:0.5, zn:0.2, mg_:12, k:170, epadha:0, omega3:0 },
  bean_sprout: { id:"bean_sprout", name:"Giá đỗ",        icon:"🌱", unitName:"g", unitGrams:1,
    cal:30,  p:3,  c:5.9, f:0.2,  vitA:1,  vitC:13, vitD:0, vitB12:0,   folate:61, ca:13, fe:0.9, zn:0.4, mg_:21, k:155, epadha:0, omega3:0 },

  // ── FRUITS ──────────────────────────────────────────────────────────
  banana:  { id:"banana",  name:"Chuối",   icon:"🍌", unitName:"quả", unitGrams:100,
    cal:89,  p:1.1,c:23,  f:0.3,  vitA:3,  vitC:8.7, vitD:0, vitB12:0, folate:20, ca:5,  fe:0.3, zn:0.2, mg_:27, k:358, epadha:0, omega3:0 },
  orange:  { id:"orange",  name:"Cam",     icon:"🍊", unitName:"quả", unitGrams:150,
    cal:47,  p:0.9,c:12,  f:0.1,  vitA:11, vitC:53,  vitD:0, vitB12:0, folate:30, ca:40, fe:0.1, zn:0.1, mg_:10, k:181, epadha:0, omega3:0 },
  guava:   { id:"guava",   name:"Ổi",      icon:"🍐", unitName:"quả", unitGrams:150,
    cal:68,  p:2.6,c:14,  f:1.0,  vitA:31, vitC:228, vitD:0, vitB12:0, folate:49, ca:18, fe:0.3, zn:0.2, mg_:22, k:417, epadha:0, omega3:0 },
  avocado: { id:"avocado", name:"Quả bơ",  icon:"🥑", unitName:"quả", unitGrams:150,
    cal:160, p:2,  c:9,   f:15,   vitA:7,  vitC:10,  vitD:0, vitB12:0, folate:81, ca:12, fe:0.6, zn:0.6, mg_:29, k:485, epadha:0, omega3:0.1},

  // ── DAIRY ────────────────────────────────────────────────────────────
  milk:    { id:"milk",    name:"Sữa tươi",     icon:"🥛", unitName:"ly",   unitGrams:240,
    cal:61,  p:3.2,c:4.8, f:3.3,  vitA:46, vitC:0, vitD:40, vitB12:0.45, folate:5, ca:120,fe:0, zn:0.4, mg_:11, k:150, epadha:0, omega3:0 },
  yogurt:  { id:"yogurt",  name:"Sữa chua KĐ",  icon:"🥛", unitName:"hộp",  unitGrams:120,
    cal:61,  p:3.5,c:4.7, f:3.3,  vitA:27, vitC:0.5,vitD:0, vitB12:0.40, folate:7, ca:110,fe:0.1,zn:0.5, mg_:12, k:141, epadha:0, omega3:0 },

  // ── NUTS / SEEDS ─────────────────────────────────────────────────────
  almonds: { id:"almonds", name:"Hạnh nhân", icon:"🥜", unitName:"g", unitGrams:1,
    cal:579, p:21, c:22,  f:50,   vitA:0, vitC:0, vitD:0, vitB12:0,    folate:44, ca:264,fe:3.7, zn:3.1, mg_:270,k:733, epadha:0, omega3:0 },

  // ── OILS ─────────────────────────────────────────────────────────────
  olive_oil:{ id:"olive_oil",name:"Dầu ô-liu", icon:"🫙", unitName:"muỗng", unitGrams:14,
    cal:884, p:0,  c:0,   f:100,  vitA:0, vitC:0, vitD:0, vitB12:0,    folate:0, ca:1,   fe:0.6, zn:0,   mg_:0,  k:1,   epadha:0, omega3:0.1},
};

// ── MEAL TEMPLATES ──────────────────────────────────────────────────────────

interface TemplateItem { foodId: string; grams: number; }

interface MealTemplate {
  name: string;
  icon: string;
  slot: "breakfast" | "snack1" | "lunch" | "snack2" | "dinner";
  items: TemplateItem[];
}

function baseCal(t: MealTemplate): number {
  return t.items.reduce((s, i) => s + (F[i.foodId].cal * i.grams / 100), 0);
}

const TEMPLATES: MealTemplate[] = [
  // ── BREAKFAST (4 options) ──────────────────────────────────────────
  { name:"Phở bò",          icon:"🍜", slot:"breakfast", items:[
    { foodId:"noodle",        grams:200 },
    { foodId:"beef",          grams:80  },
    { foodId:"bean_sprout",   grams:60  },
    { foodId:"tomato",        grams:60  },
  ]},
  { name:"Cơm trứng + rau",  icon:"🍳", slot:"breakfast", items:[
    { foodId:"white_rice",    grams:160 },
    { foodId:"egg",           grams:120 },
    { foodId:"morning_glory", grams:100 },
    { foodId:"milk",          grams:200 },
  ]},
  { name:"Yến mạch + sữa + chuối", icon:"🥣", slot:"breakfast", items:[
    { foodId:"oats",          grams:80  },
    { foodId:"milk",          grams:240 },
    { foodId:"banana",        grams:100 },
  ]},
  { name:"Bánh mì trứng + sữa", icon:"🥖", slot:"breakfast", items:[
    { foodId:"bread",         grams:80  },
    { foodId:"egg",           grams:60  },
    { foodId:"tomato",        grams:100 },
    { foodId:"milk",          grams:240 },
  ]},

  // ── LUNCH (5 options) ─────────────────────────────────────────────
  { name:"Cơm gà luộc",     icon:"🍗", slot:"lunch", items:[
    { foodId:"white_rice",    grams:200 },
    { foodId:"chicken",       grams:150 },
    { foodId:"broccoli",      grams:100 },
    { foodId:"tomato",        grams:100 },
    { foodId:"olive_oil",     grams:8   },
  ]},
  { name:"Cơm thịt heo + cải", icon:"🥩", slot:"lunch", items:[
    { foodId:"white_rice",    grams:200 },
    { foodId:"pork",          grams:120 },
    { foodId:"cabbage",       grams:100 },
    { foodId:"carrot",        grams:80  },
    { foodId:"olive_oil",     grams:8   },
  ]},
  { name:"Bún tôm + rau",   icon:"🦐", slot:"lunch", items:[
    { foodId:"noodle",        grams:250 },
    { foodId:"shrimp",        grams:150 },
    { foodId:"morning_glory", grams:100 },
    { foodId:"tomato",        grams:80  },
  ]},
  { name:"Cơm cá rô phi + rau", icon:"🐠", slot:"lunch", items:[
    { foodId:"white_rice",    grams:200 },
    { foodId:"tilapia",       grams:180 },
    { foodId:"spinach",       grams:100 },
    { foodId:"carrot",        grams:80  },
    { foodId:"olive_oil",     grams:8   },
  ]},
  { name:"Cơm đậu phụ + rau",icon:"🫘", slot:"lunch", items:[
    { foodId:"white_rice",    grams:200 },
    { foodId:"tofu",          grams:200 },
    { foodId:"broccoli",      grams:100 },
    { foodId:"spinach",       grams:80  },
    { foodId:"olive_oil",     grams:10  },
  ]},

  // ── DINNER (5 options) ────────────────────────────────────────────
  { name:"Gạo lứt cá hồi",  icon:"🐟", slot:"dinner", items:[
    { foodId:"brown_rice",    grams:150 },
    { foodId:"salmon",        grams:150 },
    { foodId:"broccoli",      grams:100 },
    { foodId:"tomato",        grams:100 },
  ]},
  { name:"Gạo lứt thịt bò + rau", icon:"🥩", slot:"dinner", items:[
    { foodId:"brown_rice",    grams:150 },
    { foodId:"beef",          grams:120 },
    { foodId:"spinach",       grams:100 },
    { foodId:"carrot",        grams:80  },
    { foodId:"olive_oil",     grams:5   },
  ]},
  { name:"Gạo lứt cá ngừ",  icon:"🐟", slot:"dinner", items:[
    { foodId:"brown_rice",    grams:150 },
    { foodId:"tuna",          grams:150 },
    { foodId:"morning_glory", grams:100 },
    { foodId:"cucumber",      grams:100 },
  ]},
  { name:"Gạo lứt gà + khoai lang", icon:"🍠", slot:"dinner", items:[
    { foodId:"brown_rice",    grams:120 },
    { foodId:"chicken",       grams:150 },
    { foodId:"sweet_potato",  grams:120 },
    { foodId:"spinach",       grams:80  },
  ]},
  { name:"Gạo lứt tôm + rau xanh", icon:"🦐", slot:"dinner", items:[
    { foodId:"brown_rice",    grams:150 },
    { foodId:"shrimp",        grams:150 },
    { foodId:"broccoli",      grams:100 },
    { foodId:"cabbage",       grams:80  },
    { foodId:"olive_oil",     grams:8   },
  ]},

  // ── SNACKS (4 options) ────────────────────────────────────────────
  { name:"Sữa chua + chuối", icon:"🍌", slot:"snack1", items:[
    { foodId:"yogurt",        grams:120 },
    { foodId:"banana",        grams:100 },
  ]},
  { name:"Hạnh nhân + cam",  icon:"🍊", slot:"snack2", items:[
    { foodId:"almonds",       grams:30  },
    { foodId:"orange",        grams:150 },
  ]},
  { name:"Bơ + sữa",        icon:"🥑", slot:"snack1", items:[
    { foodId:"avocado",       grams:100 },
    { foodId:"milk",          grams:200 },
  ]},
  { name:"Ổi + sữa chua",   icon:"🍐", slot:"snack2", items:[
    { foodId:"guava",         grams:150 },
    { foodId:"yogurt",        grams:120 },
  ]},
];

// ── TYPES ────────────────────────────────────────────────────────────────────

export interface PlannedItem {
  food: FoodItem;
  grams: number;
  display: string;
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface PlannedMeal {
  name: string;
  icon: string;
  slot: string;
  label: string;
  time: string;
  items: PlannedItem[];
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MicroCoverage {
  name: string;
  unit: string;
  got: number;
  target: number;
  pct: number;
}

export interface DayMealPlan {
  meals: PlannedMeal[];
  totalCal: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  microCoverage: MicroCoverage[];
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function displayQty(grams: number, food: FoodItem): string {
  const r = Math.round(grams / 5) * 5;
  if (food.unitName === "g") return `${r}g`;
  const units = Math.round((r / food.unitGrams) * 10) / 10;
  return `${units} ${food.unitName} (${r}g)`;
}

function scaleMeal(
  template: MealTemplate,
  targetCal: number,
  slotLabel: string,
  slotTime: string
): PlannedMeal {
  const base = baseCal(template);
  const scale = base > 0 ? Math.max(0.5, Math.min(2.5, targetCal / base)) : 1;

  const items: PlannedItem[] = template.items.map((ti) => {
    const food = F[ti.foodId];
    const g = Math.max(5, Math.round((ti.grams * scale) / 5) * 5);
    const factor = g / 100;
    return {
      food,
      grams: g,
      display: displayQty(g, food),
      cal: Math.round(food.cal * factor),
      protein: Math.round(food.p * factor * 10) / 10,
      carbs: Math.round(food.c * factor * 10) / 10,
      fat: Math.round(food.f * factor * 10) / 10,
    };
  });

  return {
    name: template.name,
    icon: template.icon,
    slot: template.slot,
    label: slotLabel,
    time: slotTime,
    items,
    cal: Math.round(items.reduce((s, i) => s + i.cal, 0)),
    protein: Math.round(items.reduce((s, i) => s + i.protein, 10) / 10) * 10 / 10,
    carbs: Math.round(items.reduce((s, i) => s + i.carbs, 0) * 10) / 10,
    fat: Math.round(items.reduce((s, i) => s + i.fat, 0) * 10) / 10,
  };
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function microCoverages(meals: PlannedMeal[], targets: {
  vitA: number; vitC: number; vitD: number; vitB12: number;
  folate: number; ca: number; fe: number; zn: number;
  mg_: number; k: number; epadha: number;
}): MicroCoverage[] {
  const totals = { vitA:0, vitC:0, vitD:0, vitB12:0, folate:0, ca:0, fe:0, zn:0, mg_:0, k:0, epadha:0 };
  meals.forEach((meal) =>
    meal.items.forEach((item) => {
      const factor = item.grams / 100;
      totals.vitA  += item.food.vitA  * factor;
      totals.vitC  += item.food.vitC  * factor;
      totals.vitD  += item.food.vitD  * factor;
      totals.vitB12+= item.food.vitB12* factor;
      totals.folate+= item.food.folate* factor;
      totals.ca    += item.food.ca    * factor;
      totals.fe    += item.food.fe    * factor;
      totals.zn    += item.food.zn    * factor;
      totals.mg_   += item.food.mg_   * factor;
      totals.k     += item.food.k     * factor;
      totals.epadha+= item.food.epadha* factor;
    })
  );

  return [
    { name:"Vitamin A", unit:"mcg",  got: Math.round(totals.vitA),   target: targets.vitA,   pct: Math.round(totals.vitA/targets.vitA*100)    },
    { name:"Vitamin C", unit:"mg",   got: Math.round(totals.vitC),   target: targets.vitC,   pct: Math.round(totals.vitC/targets.vitC*100)    },
    { name:"Vitamin D", unit:"IU",   got: Math.round(totals.vitD),   target: targets.vitD,   pct: Math.round(totals.vitD/targets.vitD*100)    },
    { name:"Vitamin B12",unit:"mcg", got: Math.round(totals.vitB12*10)/10, target:targets.vitB12, pct: Math.round(totals.vitB12/targets.vitB12*100) },
    { name:"Folate",    unit:"mcg",  got: Math.round(totals.folate), target: targets.folate, pct: Math.round(totals.folate/targets.folate*100) },
    { name:"Canxi",     unit:"mg",   got: Math.round(totals.ca),     target: targets.ca,     pct: Math.round(totals.ca/targets.ca*100)        },
    { name:"Sắt",       unit:"mg",   got: Math.round(totals.fe*10)/10, target: targets.fe,   pct: Math.round(totals.fe/targets.fe*100)        },
    { name:"Kẽm",       unit:"mg",   got: Math.round(totals.zn*10)/10, target: targets.zn,   pct: Math.round(totals.zn/targets.zn*100)        },
    { name:"Magiê",     unit:"mg",   got: Math.round(totals.mg_),    target: targets.mg_,    pct: Math.round(totals.mg_/targets.mg_*100)      },
    { name:"Kali",      unit:"mg",   got: Math.round(totals.k),      target: targets.k,      pct: Math.round(totals.k/targets.k*100)          },
    { name:"EPA+DHA",   unit:"mg",   got: Math.round(totals.epadha), target: targets.epadha, pct: Math.round(totals.epadha/targets.epadha*100)},
  ];
}

// ── PUBLIC API ───────────────────────────────────────────────────────────────

export interface MicroTargets {
  vitA: number; vitC: number; vitD: number; vitB12: number;
  folate: number; ca: number; fe: number; zn: number;
  mg_: number; k: number; epadha: number;
}

export function generateMealPlan(
  macros: MacroTargets,
  microTargets: MicroTargets
): DayMealPlan {
  const cal = macros.calories;

  // Calorie distribution across 5 eating events
  const dist = { breakfast: 0.25, snack1: 0.10, lunch: 0.35, snack2: 0.10, dinner: 0.20 };

  const bfTemplates  = TEMPLATES.filter((t) => t.slot === "breakfast");
  const snk1Templates= TEMPLATES.filter((t) => t.slot === "snack1");
  const lunchTemplates=TEMPLATES.filter((t) => t.slot === "lunch");
  const snk2Templates= TEMPLATES.filter((t) => t.slot === "snack2");
  const dinnerTemplates=TEMPLATES.filter((t) => t.slot === "dinner");

  const meals: PlannedMeal[] = [
    scaleMeal(pickRandom(bfTemplates),   cal * dist.breakfast, "Bữa sáng",     "07:00"),
    scaleMeal(pickRandom(snk1Templates), cal * dist.snack1,    "Bữa phụ sáng", "10:00"),
    scaleMeal(pickRandom(lunchTemplates),cal * dist.lunch,     "Bữa trưa",     "12:30"),
    scaleMeal(pickRandom(snk2Templates), cal * dist.snack2,    "Bữa phụ chiều","15:30"),
    scaleMeal(pickRandom(dinnerTemplates),cal * dist.dinner,   "Bữa tối",      "19:00"),
  ];

  const coverage = microCoverages(meals, microTargets);

  return {
    meals,
    totalCal:     meals.reduce((s, m) => s + m.cal, 0),
    totalProtein: Math.round(meals.reduce((s, m) => s + m.protein, 0) * 10) / 10,
    totalCarbs:   Math.round(meals.reduce((s, m) => s + m.carbs, 0) * 10) / 10,
    totalFat:     Math.round(meals.reduce((s, m) => s + m.fat, 0) * 10) / 10,
    microCoverage: coverage,
  };
}
