import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity, Flame, Droplets, Calculator, ChevronRight, Scale, Dumbbell, Apple, RefreshCw } from "lucide-react";
import type { NutritionResults, UserProfile, Micronutrient } from "../lib/types";
import { getMicronutrients } from "../lib/micronutrients";

const GOAL_LABELS: Record<string, string> = {
  lose_fast: "Giảm nhanh",
  lose: "Giảm cân",
  maintain: "Duy trì",
  gain: "Tăng cân",
  gain_fast: "Tăng nhanh",
};

const ACTIVITY_LABELS: Record<string, string> = {
  sedentary: "Ít vận động",
  light: "Nhẹ",
  moderate: "Vừa phải",
  active: "Tích cực",
  very_active: "Rất tích cực",
};

type Tab = "overview" | "amino" | "vitamins" | "bioactive";

function StatCard({ icon, title, value, unit, sub, color }: {
  icon: React.ReactNode; title: string; value: string | number; unit?: string; sub?: string; color?: string;
}) {
  return (
    <div className="metric-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ padding: 10, borderRadius: 10, background: `${color || "#10b981"}20` }}>
          {icon}
        </div>
        <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>{title}</span>
      </div>
      <div>
        <span style={{ fontSize: 32, fontWeight: 700, color: color || "#10b981" }}>{value}</span>
        {unit && <span style={{ fontSize: 14, color: "#64748b", marginLeft: 4 }}>{unit}</span>}
        {sub && <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{sub}</p>}
      </div>
    </div>
  );
}

function BMIGauge({ bmi }: { bmi: NutritionResults["bmi"] }) {
  const zones = [
    { label: "Thiếu cân", max: 18.5, color: "#eab308" },
    { label: "Bình thường", max: 25, color: "#10b981" },
    { label: "Thừa cân", max: 30, color: "#f97316" },
    { label: "Béo phì", max: 40, color: "#ef4444" },
  ];

  return (
    <div className="metric-card" style={{ gridColumn: "1 / -1" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ padding: 10, borderRadius: 10, background: `${bmi.color}20` }}>
          <Scale size={20} color={bmi.color} />
        </div>
        <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>Chỉ số BMI</span>
        <div style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: 20, background: `${bmi.color}20`, border: `1px solid ${bmi.color}40`, fontSize: 13, fontWeight: 600, color: bmi.color }}>
          {bmi.category}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 48, fontWeight: 800, color: bmi.color }}>{bmi.value}</span>
        <span style={{ fontSize: 16, color: "#64748b" }}>kg/m²</span>
      </div>

      <div style={{ position: "relative", height: 12, borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 8 }}>
        {zones.map((z) => (
          <div key={z.label} style={{ flex: 1, background: z.color, opacity: 0.3 }} />
        ))}
        <div style={{
          position: "absolute", top: "50%",
          left: `${Math.min(95, Math.max(5, ((bmi.value - 10) / 30) * 100))}%`,
          transform: "translate(-50%, -50%)",
          width: 16, height: 16, borderRadius: "50%",
          background: bmi.color, border: "2px solid white",
          boxShadow: `0 0 8px ${bmi.color}`,
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: "#64748b" }}>10</span>
        {zones.map((z) => (
          <span key={z.label} style={{ fontSize: 11, color: "#64748b" }}>{z.max}</span>
        ))}
      </div>

      <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{bmi.description}</p>
      <p style={{ fontSize: 13, color: "#64748b", marginTop: 8 }}>
        Cân nặng lý tưởng: <strong style={{ color: "#10b981" }}>{bmi.idealMinKg}–{bmi.idealMaxKg} kg</strong>
      </p>
    </div>
  );
}

function MacroPieChart({ macros }: { macros: NutritionResults["macros"] }) {
  const data = [
    { name: "Protein", value: macros.proteinKcal, color: "#10b981", grams: macros.proteinG },
    { name: "Carbs", value: macros.carbsKcal, color: "#f59e0b", grams: macros.carbsG },
    { name: "Chất béo", value: macros.fatKcal, color: "#8b5cf6", grams: macros.fatG },
  ];

  return (
    <div className="metric-card">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ padding: 10, borderRadius: 10, background: "rgba(16,185,129,0.2)" }}>
          <Apple size={20} color="#10b981" />
        </div>
        <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>Phân bổ Macro</span>
        <span style={{ marginLeft: "auto", fontSize: 20, fontWeight: 700, color: "#f59e0b" }}>
          {macros.calories.toLocaleString()} <span style={{ fontSize: 14, color: "#64748b" }}>kcal</span>
        </span>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f1f5f9", fontSize: 13 }}
            formatter={(val, name) => [`${val} kcal`, name]}
          />
          <Legend formatter={(value) => <span style={{ color: "#94a3b8", fontSize: 13 }}>{value}</span>} />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        {data.map((d) => (
          <div key={d.name} style={{ flex: 1, background: `${d.color}15`, border: `1px solid ${d.color}30`, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: d.color }}>{d.grams}g</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{d.name}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>{d.value} kcal</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  vitamin: "#f59e0b",
  mineral: "#a78bfa",
  amino_acid: "#10b981",
  fatty_acid: "#06b6d4",
  bioactive: "#f472b6",
};

const CATEGORY_LABELS: Record<string, string> = {
  vitamin: "Vitamin",
  mineral: "Khoáng chất",
  amino_acid: "Amino acid",
  fatty_acid: "Axit béo",
  bioactive: "Hợp chất sinh học",
};

function NutrientRow({ n, index, total }: { n: Micronutrient; index: number; total: number }) {
  return (
    <tr style={{ borderBottom: index < total - 1 ? "1px solid rgba(71,85,105,0.15)" : "none" }}>
      <td style={{ padding: "10px 12px", fontSize: 20 }}>{n.icon}</td>
      <td style={{ padding: "10px 12px" }}>
        <div style={{ color: "#e2e8f0", fontWeight: 500, fontSize: 14 }}>{n.name}</div>
        {n.personalized && (
          <span style={{ fontSize: 10, fontWeight: 600, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "1px 6px", borderRadius: 8, marginTop: 2, display: "inline-block" }}>
            cá nhân hóa
          </span>
        )}
      </td>
      <td style={{ padding: "10px 12px", color: "#10b981", fontWeight: 600, whiteSpace: "nowrap", verticalAlign: "top" }}>
        {n.rda !== null ? (
          <>
            <span>{n.rda} {n.unit}</span>
            {n.rdaNote && <div style={{ fontSize: 10, color: "#475569", marginTop: 2 }}>{n.rdaNote}</div>}
            {n.upperLimitDisplay && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 1 }}>UL: {n.upperLimitDisplay}</div>}
          </>
        ) : (
          <span style={{ color: "#64748b", fontSize: 13 }}>Không có RDA</span>
        )}
        {n.suggestion && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2, maxWidth: 220 }}>{n.suggestion}</div>}
      </td>
      <td style={{ padding: "10px 12px", color: "#94a3b8", fontSize: 13 }}>
        {n.sources.slice(0, 3).join(", ")}
      </td>
      <td style={{ padding: "10px 12px", fontSize: 12, color: "#64748b" }}>
        {n.deficiency && <div style={{ marginBottom: 2 }}>⚠️ {n.deficiency}</div>}
        {n.excess && <div style={{ color: "#ef4444" }}>☠️ {n.excess}</div>}
      </td>
    </tr>
  );
}

function NutrientTable({ nutrients, title, icon, color }: {
  nutrients: Micronutrient[];
  title: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="metric-card" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ padding: 10, borderRadius: 10, background: `${color}20` }}>{icon}</div>
        <span style={{ fontSize: 15, color: "#e2e8f0", fontWeight: 600 }}>{title}</span>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#64748b" }}>{nutrients.length} vi chất</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(71,85,105,0.3)" }}>
              {["", "Tên", "RDA / Khuyến nghị", "Nguồn thực phẩm", "Tác dụng"].map((h) => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#64748b", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nutrients.map((n, i) => (
              <NutrientRow key={n.name} n={n} index={i} total={nutrients.length} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AminoAcidTab({ nutrients, weightKg }: { nutrients: Micronutrient[]; weightKg: number }) {
  const amino = nutrients.filter((n) => n.category === "amino_acid");
  return (
    <div>
      <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <p style={{ fontSize: 14, color: "#10b981", fontWeight: 600, marginBottom: 6 }}>📐 Cá nhân hóa theo cân nặng</p>
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
          Nhu cầu amino acid thiết yếu được tính theo cân nặng của bạn (<strong style={{ color: "#f1f5f9" }}>{weightKg} kg</strong>)
          dựa trên tiêu chuẩn WHO/FAO/UNU 2007 (mg/kg thể trọng/ngày).
          Mỗi giá trị RDA thay đổi khi bạn thay đổi cân nặng.
        </p>
      </div>
      <NutrientTable
        nutrients={amino}
        title="9 Amino acid thiết yếu"
        icon={<Dumbbell size={20} color="#10b981" />}
        color="#10b981"
      />
    </div>
  );
}

function VitaminMineralTab({ nutrients, targetCalories }: { nutrients: Micronutrient[]; targetCalories: number }) {
  const [filter, setFilter] = useState<"all" | "vitamin" | "mineral">("all");
  const vitamins = nutrients.filter((n) => n.category === "vitamin");
  const minerals = nutrients.filter((n) => n.category === "mineral");
  const personalizedB = vitamins.filter((n) => n.personalized);

  const shown = filter === "all" ? [...vitamins, ...minerals]
    : filter === "vitamin" ? vitamins
    : minerals;

  return (
    <div>
      {personalizedB.length > 0 && (
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: "#f59e0b", fontWeight: 600, marginBottom: 6 }}>⚡ Cá nhân hóa theo calo</p>
          <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
            Vitamin B1, B2, B3 được điều chỉnh theo lượng calo mục tiêu của bạn
            (<strong style={{ color: "#f1f5f9" }}>{targetCalories.toLocaleString()} kcal/ngày</strong>).
            Nhu cầu tăng tỷ lệ với lượng thức ăn để hỗ trợ quá trình chuyển hóa năng lượng.
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {(["all", "vitamin", "mineral"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
              border: "1px solid",
              background: filter === f ? "rgba(139,92,246,0.2)" : "transparent",
              borderColor: filter === f ? "rgba(139,92,246,0.6)" : "rgba(71,85,105,0.4)",
              color: filter === f ? "#a78bfa" : "#64748b",
              cursor: "pointer",
            }}
          >
            {f === "all" ? `Tất cả (${vitamins.length + minerals.length})` : f === "vitamin" ? `Vitamin (${vitamins.length})` : `Khoáng chất (${minerals.length})`}
          </button>
        ))}
      </div>

      <NutrientTable
        nutrients={shown}
        title={filter === "vitamin" ? "Vitamin" : filter === "mineral" ? "Khoáng chất" : "Vitamin & Khoáng chất"}
        icon={<Dumbbell size={20} color="#a78bfa" />}
        color="#a78bfa"
      />
    </div>
  );
}

function BioactiveTab({ nutrients }: { nutrients: Micronutrient[] }) {
  const fattyAcids = nutrients.filter((n) => n.category === "fatty_acid");
  const bioactives = nutrients.filter((n) => n.category === "bioactive");

  const groups = [
    { key: "Carotenoid" },
    { key: "Omega-3 chuỗi dài" },
    { key: "Chống oxy hóa thực vật" },
    { key: "Sức khỏe đường ruột" },
    { key: "Phosphagen" },
    { key: "Vận chuyển chất béo" },
    { key: "Acid amin có điều kiện" },
    { key: "Thiết yếu có điều kiện" },
    { key: "Chống oxy hóa ty thể" },
  ];

  return (
    <div>
      <div style={{ background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.25)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <p style={{ fontSize: 14, color: "#f472b6", fontWeight: 600, marginBottom: 6 }}>ℹ️ Hợp chất sinh học & axit béo</p>
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
          Các hợp chất này không có RDA chính thức nhưng có vai trò quan trọng với sức khỏe.
          Ưu tiên lấy từ thực phẩm tự nhiên; chỉ bổ sung khi có lý do cụ thể.
        </p>
      </div>

      <NutrientTable
        nutrients={fattyAcids}
        title="Axit béo thiết yếu"
        icon={<span style={{ fontSize: 20 }}>🐟</span>}
        color="#06b6d4"
      />

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {groups.map((grp) => {
            const count = bioactives.filter((n) => n.subgroup === grp.key).length;
            if (count === 0) return null;
            return (
              <span key={grp.key} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, background: "rgba(71,85,105,0.2)", color: "#94a3b8", border: "1px solid rgba(71,85,105,0.3)" }}>
                {grp.key} ({count})
              </span>
            );
          })}
        </div>
      </div>

      <NutrientTable
        nutrients={bioactives}
        title="Hợp chất sinh học"
        icon={<span style={{ fontSize: 20 }}>🧪</span>}
        color="#f472b6"
      />
    </div>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<NutritionResults | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    const r = sessionStorage.getItem("nutri_results");
    const p = sessionStorage.getItem("nutri_profile");
    if (!r || !p) {
      navigate("/calculator");
      return;
    }
    setResults(JSON.parse(r));
    setProfile(JSON.parse(p));
  }, [navigate]);

  if (!results || !profile) return null;

  const nutrients = getMicronutrients(
    profile.age,
    profile.gender,
    profile.weightKg,
    results.targetCalories
  );

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: "overview", label: "📊 Tổng quan" },
    { id: "amino", label: "💪 Amino Acids", count: nutrients.filter((n) => n.category === "amino_acid").length },
    { id: "vitamins", label: "🧬 Vitamin & Khoáng chất", count: nutrients.filter((n) => n.category === "vitamin" || n.category === "mineral").length },
    { id: "bioactive", label: "🧪 Hợp chất sinh học", count: nutrients.filter((n) => n.category === "fatty_acid" || n.category === "bioactive").length },
  ];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>
              {profile.name ? `Kết quả của ${profile.name}` : "Kết quả dinh dưỡng"}
            </h1>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="badge" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
                {profile.gender === "male" ? "👨 Nam" : "👩 Nữ"} · {profile.age} tuổi
              </span>
              <span className="badge" style={{ background: "rgba(71,85,105,0.3)", color: "#94a3b8", border: "1px solid rgba(71,85,105,0.4)" }}>
                {profile.heightCm}cm · {profile.weightKg}kg
              </span>
              <span className="badge" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}>
                🎯 {GOAL_LABELS[profile.weightGoal]}
              </span>
              <span className="badge" style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }}>
                ⚡ {ACTIVITY_LABELS[profile.activityLevel]}
              </span>
            </div>
          </div>
          <Link to="/calculator" className="btn-secondary" style={{ fontSize: 14 }}>
            <RefreshCw size={16} /> Tính lại
          </Link>
        </div>
      </div>

      {/* Tab navigation */}
      <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: "1px solid rgba(71,85,105,0.3)", flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "10px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer",
              background: "transparent", border: "none",
              borderBottom: tab === t.id ? "2px solid #10b981" : "2px solid transparent",
              color: tab === t.id ? "#10b981" : "#64748b",
              marginBottom: -1,
              transition: "color 0.15s",
            }}
          >
            {t.label}
            {t.count !== undefined && (
              <span style={{ marginLeft: 6, fontSize: 11, background: "rgba(71,85,105,0.3)", color: "#94a3b8", padding: "1px 6px", borderRadius: 10 }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
            <BMIGauge bmi={results.bmi} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 20 }}>
            <StatCard
              icon={<Flame size={20} color="#f59e0b" />}
              title="Trao đổi chất cơ bản (BMR)"
              value={results.bmr.toLocaleString()}
              unit="kcal/ngày"
              sub="Mifflin-St Jeor"
              color="#f59e0b"
            />
            <StatCard
              icon={<Activity size={20} color="#06b6d4" />}
              title="Nhu cầu calo TDEE"
              value={results.tdee.toLocaleString()}
              unit="kcal/ngày"
              sub={`× hệ số ${ACTIVITY_LABELS[profile.activityLevel].toLowerCase()}`}
              color="#06b6d4"
            />
            <StatCard
              icon={<Calculator size={20} color="#10b981" />}
              title="Calo mục tiêu"
              value={results.targetCalories.toLocaleString()}
              unit="kcal/ngày"
              sub={GOAL_LABELS[profile.weightGoal]}
              color="#10b981"
            />
            <StatCard
              icon={<Droplets size={20} color="#3b82f6" />}
              title="Nhu cầu nước"
              value={(results.waterMl / 1000).toFixed(1)}
              unit="lít/ngày"
              sub={`≈ ${Math.round(results.waterMl / 250)} ly (250ml)`}
              color="#3b82f6"
            />
            {results.bodyFatEstimate !== undefined && results.bodyFatEstimate !== null && (
              <StatCard
                icon={<Scale size={20} color="#8b5cf6" />}
                title="Ước tính mỡ cơ thể"
                value={results.bodyFatEstimate}
                unit="%"
                sub="Công thức Deurenberg"
                color="#8b5cf6"
              />
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 20 }}>
            <MacroPieChart macros={results.macros} />
          </div>

          {/* Summary panel */}
          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
            <p style={{ fontSize: 15, color: "#f1f5f9", fontWeight: 600, marginBottom: 12 }}>
              🔬 Dữ liệu dinh dưỡng đầy đủ: {nutrients.length} vi chất
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
                const count = nutrients.filter((n) => n.category === cat).length;
                const color = CATEGORY_COLORS[cat];
                if (count === 0) return null;
                return (
                  <span key={cat} style={{ fontSize: 13, padding: "4px 12px", borderRadius: 20, background: `${color}15`, color, border: `1px solid ${color}30` }}>
                    {label}: {count}
                  </span>
                );
              })}
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 12 }}>
              Amino acid được tính theo cân nặng ({profile.weightKg} kg) · Vitamin B1/B2/B3 theo calo mục tiêu ({results.targetCalories.toLocaleString()} kcal)
            </p>
          </div>
        </>
      )}

      {tab === "amino" && (
        <AminoAcidTab nutrients={nutrients} weightKg={profile.weightKg} />
      )}

      {tab === "vitamins" && (
        <VitaminMineralTab nutrients={nutrients} targetCalories={results.targetCalories} />
      )}

      {tab === "bioactive" && (
        <BioactiveTab nutrients={nutrients} />
      )}

      {/* CTA */}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 16, padding: "28px 24px" }}>
          <p style={{ fontSize: 16, color: "#f1f5f9", fontWeight: 600, marginBottom: 8 }}>
            Muốn tính toán lại hoặc chia sẻ kết quả?
          </p>
          <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 20 }}>
            Kết quả được lưu tạm trong phiên làm việc này.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/calculator" className="btn-primary">
              <RefreshCw size={16} /> Tính lại
            </Link>
            <button className="btn-secondary" onClick={() => window.print()}>
              🖨️ In kết quả
            </button>
            <Link to="/" className="btn-secondary">
              Trang chủ <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
