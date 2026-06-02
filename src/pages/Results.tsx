import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity, Flame, Droplets, Calculator, ChevronRight, Scale, Dumbbell, Apple, RefreshCw } from "lucide-react";
import type { NutritionResults, UserProfile } from "../lib/types";
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

      {/* Bar */}
      <div style={{ position: "relative", height: 12, borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 8 }}>
        {zones.map((z) => (
          <div key={z.label} style={{ flex: 1, background: z.color, opacity: 0.3 }} />
        ))}
        {/* Indicator */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: `${Math.min(95, Math.max(5, ((bmi.value - 10) / 30) * 100))}%`,
          transform: "translate(-50%, -50%)",
          width: 16, height: 16, borderRadius: "50%",
          background: bmi.color,
          border: "2px solid white",
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
        Cân nặng lý tưởng cho chiều cao của bạn: <strong style={{ color: "#10b981" }}>{bmi.idealMinKg}–{bmi.idealMaxKg} kg</strong>
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

function MicronutrientTable({ profile }: { profile: UserProfile }) {
  const [filter, setFilter] = useState<"all" | "vitamin" | "mineral">("all");
  const nutrients = getMicronutrients(profile.age, profile.gender);
  const filtered = filter === "all" ? nutrients : nutrients.filter((n) => n.category === filter);

  return (
    <div style={{ gridColumn: "1 / -1" }}>
      <div className="metric-card">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ padding: 10, borderRadius: 10, background: "rgba(139,92,246,0.2)" }}>
              <Dumbbell size={20} color="#8b5cf6" />
            </div>
            <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>Vi chất dinh dưỡng (RDA)</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {(["all", "vitamin", "mineral"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                  border: "1px solid",
                  background: filter === f ? "rgba(139,92,246,0.2)" : "transparent",
                  borderColor: filter === f ? "rgba(139,92,246,0.6)" : "rgba(71,85,105,0.4)",
                  color: filter === f ? "#a78bfa" : "#64748b",
                  cursor: "pointer",
                }}
              >
                {f === "all" ? "Tất cả" : f === "vitamin" ? "Vitamin" : "Khoáng chất"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(71,85,105,0.3)" }}>
                {["", "Vi chất", "Loại", "RDA", "Nguồn thực phẩm"].map((h) => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#64748b", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((n, i) => (
                <tr key={n.name} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(71,85,105,0.15)" : "none" }}>
                  <td style={{ padding: "10px 12px", fontSize: 20 }}>{n.icon}</td>
                  <td style={{ padding: "10px 12px", color: "#e2e8f0", fontWeight: 500 }}>{n.name}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 500,
                      background: n.category === "vitamin" ? "rgba(245,158,11,0.15)" : "rgba(139,92,246,0.15)",
                      color: n.category === "vitamin" ? "#f59e0b" : "#a78bfa",
                    }}>
                      {n.category === "vitamin" ? "Vitamin" : "Khoáng chất"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#10b981", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {n.rda} {n.unit}
                    {n.upperLimit && <span style={{ fontSize: 11, color: "#475569", display: "block" }}>Tối đa: {n.upperLimit}</span>}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#94a3b8", fontSize: 13 }}>
                    {n.sources.slice(0, 3).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<NutritionResults | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

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

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
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

      {/* Grid layout */}
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
        {results.bodyFatEstimate && (
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        <MicronutrientTable profile={profile} />
      </div>

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
            <button
              className="btn-secondary"
              onClick={() => window.print()}
            >
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
