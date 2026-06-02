import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, User, Target, Dumbbell } from "lucide-react";
import type { UserProfile, Gender, ActivityLevel, WeightGoal } from "../lib/types";
import { calculate } from "../lib/calculations";

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string; emoji: string }[] = [
  { value: "sedentary", label: "Ít vận động", desc: "Ngồi nhiều, ít tập thể dục", emoji: "🪑" },
  { value: "light", label: "Nhẹ", desc: "Tập 1–3 buổi/tuần", emoji: "🚶" },
  { value: "moderate", label: "Vừa phải", desc: "Tập 3–5 buổi/tuần", emoji: "🏃" },
  { value: "active", label: "Tích cực", desc: "Tập 6–7 buổi/tuần", emoji: "🏋️" },
  { value: "very_active", label: "Rất tích cực", desc: "Công việc thể chất nặng", emoji: "⚡" },
];

const GOAL_OPTIONS: { value: WeightGoal; label: string; desc: string; emoji: string; color: string }[] = [
  { value: "lose_fast", label: "Giảm nhanh", desc: "–750 kcal/ngày (~1kg/tuần)", emoji: "🔥", color: "#ef4444" },
  { value: "lose", label: "Giảm cân", desc: "–500 kcal/ngày (~0.5kg/tuần)", emoji: "📉", color: "#f97316" },
  { value: "maintain", label: "Duy trì", desc: "Giữ nguyên cân nặng hiện tại", emoji: "⚖️", color: "#10b981" },
  { value: "gain", label: "Tăng cân", desc: "+500 kcal/ngày (~0.5kg/tuần)", emoji: "📈", color: "#8b5cf6" },
  { value: "gain_fast", label: "Tăng nhanh", desc: "+750 kcal/ngày (~1kg/tuần)", emoji: "💪", color: "#06b6d4" },
];

const STEPS = [
  { icon: <User size={18} />, label: "Thông tin cá nhân" },
  { icon: <Dumbbell size={18} />, label: "Mức độ vận động" },
  { icon: <Target size={18} />, label: "Mục tiêu" },
];

export default function Calculator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: "",
    gender: "male",
    age: 25,
    heightCm: 170,
    weightKg: 65,
    activityLevel: "moderate",
    weightGoal: "maintain",
  });

  const update = (key: keyof UserProfile, value: unknown) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const isStep0Valid =
    profile.name &&
    profile.age &&
    profile.age >= 10 &&
    profile.age <= 120 &&
    profile.heightCm &&
    profile.heightCm >= 100 &&
    profile.heightCm <= 250 &&
    profile.weightKg &&
    profile.weightKg >= 20 &&
    profile.weightKg <= 300;

  const handleFinish = () => {
    const results = calculate(profile as UserProfile);
    sessionStorage.setItem("nutri_results", JSON.stringify(results));
    sessionStorage.setItem("nutri_profile", JSON.stringify(profile));
    navigate("/results");
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      {/* Progress */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, opacity: i <= step ? 1 : 0.4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: i < step ? "#10b981" : i === step ? "linear-gradient(135deg, #10b981, #059669)" : "rgba(71,85,105,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: 13, fontWeight: 600,
                border: i === step ? "2px solid #10b981" : "none",
                boxShadow: i === step ? "0 0 12px rgba(16,185,129,0.4)" : "none",
              }}>
                {i < step ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 13, color: i === step ? "#f1f5f9" : "#64748b", fontWeight: i === step ? 600 : 400 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(71,85,105,0.3)", borderRadius: 2, height: 4 }}>
          <div className="progress-bar" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      {/* Step 0: Profile */}
      {step === 0 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>
            Thông tin của bạn
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: 32 }}>Nhập các thông số cơ bản để tính toán</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: 14, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>
                Tên của bạn (tùy chọn)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={profile.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label style={{ display: "block", fontSize: 14, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>
                Giới tính
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {(["male", "female"] as Gender[]).map((g) => (
                  <div
                    key={g}
                    className={`radio-card ${profile.gender === g ? "selected" : ""}`}
                    onClick={() => update("gender", g)}
                    style={{ textAlign: "center", userSelect: "none" }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{g === "male" ? "👨" : "👩"}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: profile.gender === g ? "#10b981" : "#e2e8f0" }}>
                      {g === "male" ? "Nam" : "Nữ"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label style={{ display: "block", fontSize: 14, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>
                Tuổi
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="25"
                min={10} max={120}
                value={profile.age || ""}
                onChange={(e) => update("age", Number(e.target.value))}
              />
            </div>

            {/* Height & Weight */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 14, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>
                  Chiều cao (cm)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="170"
                  min={100} max={250}
                  value={profile.heightCm || ""}
                  onChange={(e) => update("heightCm", Number(e.target.value))}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>
                  Cân nặng (kg)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="65"
                  min={20} max={300}
                  value={profile.weightKg || ""}
                  onChange={(e) => update("weightKg", Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
            <button className="btn-primary" disabled={!isStep0Valid} onClick={() => setStep(1)}>
              Tiếp theo <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Activity */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>
            Mức độ vận động
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: 32 }}>Chọn mức phù hợp với lối sống hàng ngày</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ACTIVITY_OPTIONS.map((opt) => (
              <div
                key={opt.value}
                className={`radio-card ${profile.activityLevel === opt.value ? "selected" : ""}`}
                onClick={() => update("activityLevel", opt.value)}
                style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
              >
                <span style={{ fontSize: 28, minWidth: 40 }}>{opt.emoji}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: profile.activityLevel === opt.value ? "#10b981" : "#e2e8f0" }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{opt.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            <button className="btn-secondary" onClick={() => setStep(0)}>
              <ChevronLeft size={18} /> Quay lại
            </button>
            <button className="btn-primary" onClick={() => setStep(2)}>
              Tiếp theo <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Goal */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>
            Mục tiêu của bạn
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: 32 }}>Chọn mục tiêu cân nặng bạn muốn đạt được</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {GOAL_OPTIONS.map((opt) => (
              <div
                key={opt.value}
                className={`radio-card ${profile.weightGoal === opt.value ? "selected" : ""}`}
                onClick={() => update("weightGoal", opt.value)}
                style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
              >
                <span style={{ fontSize: 28, minWidth: 40 }}>{opt.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: profile.weightGoal === opt.value ? "#10b981" : "#e2e8f0" }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{opt.desc}</div>
                </div>
                <div style={{
                  padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  color: opt.color, border: `1px solid ${opt.color}40`, background: `${opt.color}15`,
                }}>
                  {opt.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            <button className="btn-secondary" onClick={() => setStep(1)}>
              <ChevronLeft size={18} /> Quay lại
            </button>
            <button className="btn-primary" onClick={handleFinish}>
              Xem kết quả <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
