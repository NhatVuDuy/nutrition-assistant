import { Link } from "react-router-dom";

const S = {
  page: { maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" } as React.CSSProperties,
  h1: { fontSize: 30, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 } as React.CSSProperties,
  h2: { fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginTop: 40, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 } as React.CSSProperties,
  card: { background: "rgba(30,41,59,0.6)", border: "1px solid rgba(71,85,105,0.35)", borderRadius: 12, padding: "20px 24px", marginBottom: 16 } as React.CSSProperties,
  badge: (color: string) => ({ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: `${color}18`, color, border: `1px solid ${color}35` }),
  mono: { fontFamily: "monospace", fontSize: 13, color: "#94a3b8", background: "rgba(15,23,42,0.6)", padding: "2px 7px", borderRadius: 5 } as React.CSSProperties,
  pill: { fontSize: 12, padding: "3px 10px", borderRadius: 20, background: "rgba(71,85,105,0.3)", color: "#94a3b8", border: "1px solid rgba(71,85,105,0.4)", marginRight: 6, marginBottom: 4, display: "inline-block" } as React.CSSProperties,
};

function Badge({ color, label }: { color: string; label: string }) {
  return <span style={S.badge(color)}>{label}</span>;
}

function Layer({ color, title, items }: { color: string; title: string; items: { name: string; desc: string; file?: string }[] }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 16, marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>{title}</div>
      {items.map((item) => (
        <div key={item.name} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{item.name}</span>
            {item.file && <span style={S.mono}>{item.file}</span>}
          </div>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 3, lineHeight: 1.6 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

function FlowStep({ step, label, sub, color, arrow }: { step: string; label: string; sub: string; color: string; arrow?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      <div style={{ flex: 1, background: `${color}12`, border: `1px solid ${color}35`, borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 3 }}>{step}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color }}>{label}</div>
        <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>{sub}</div>
      </div>
      {arrow && (
        <div style={{ fontSize: 18, color: "#334155", padding: "0 6px", flexShrink: 0 }}>→</div>
      )}
    </div>
  );
}

export default function System() {
  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 28 }}>🏗️</span>
          <h1 style={S.h1}>Kiến trúc hệ thống</h1>
        </div>
        <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>
          NutriCalc — ứng dụng tư vấn dinh dưỡng cá nhân hóa, chạy hoàn toàn phía client, không cần backend hay cơ sở dữ liệu.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          <span style={{ fontSize: 12, color: "#10b981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", padding: "3px 12px", borderRadius: 20, fontFamily: "monospace", fontWeight: 600 }}>
            version {__APP_VERSION__}
          </span>
          {["React 18", "TypeScript", "Vite 8", "Tailwind CSS v4", "Recharts v3", "React Router v7"].map((t) => (
            <span key={t} style={S.pill}>{t}</span>
          ))}
        </div>
      </div>

      {/* Deployment */}
      <div style={S.card}>
        <h2 style={{ ...S.h2, margin: 0, marginBottom: 14 }}>🌐 Triển khai</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { label: "Hosting",    value: "GitHub Pages",          color: "#10b981" },
            { label: "CI/CD",      value: "GitHub Actions",         color: "#06b6d4" },
            { label: "Domain",     value: "nutritor.zenpax.io.vn",  color: "#f59e0b" },
            { label: "Build",      value: "npm run build → dist/",  color: "#a78bfa" },
            { label: "Trigger",    value: "Push → main branch",     color: "#f472b6" },
            { label: "SPA Routing","value": "404.html redirect",     color: "#94a3b8" },
          ].map((r) => (
            <div key={r.label} style={{ background: "rgba(15,23,42,0.5)", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, color: "#475569", marginBottom: 3 }}>{r.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: r.color }}>{r.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Flow */}
      <h2 style={S.h2}><span>🔄</span> Luồng hoạt động</h2>
      <div style={S.card}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", minWidth: 600, gap: 0 }}>
            <FlowStep step="1. Input" label="Calculator" sub="Form 3 bước" color="#06b6d4" arrow />
            <FlowStep step="2. Compute" label="calculations.ts" sub="BMI/BMR/TDEE/Macro" color="#f59e0b" arrow />
            <FlowStep step="3. Store" label="sessionStorage" sub="nutri_results + nutri_profile" color="#a78bfa" arrow />
            <FlowStep step="4. Display" label="Results" sub="5 tabs kết quả" color="#10b981" arrow />
            <FlowStep step="5. Plan" label="mealPlanner.ts" sub="Thực đơn gợi ý" color="#f472b6" />
          </div>
        </div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { step: "Bước 1", color: "#06b6d4", detail: "Người dùng nhập: tên (tùy chọn), giới tính, tuổi, chiều cao, cân nặng, mức vận động, mục tiêu cân nặng." },
            { step: "Bước 2", color: "#f59e0b", detail: "calculate() → calcBMI() → calcBMR() (Mifflin-St Jeor) → calcTDEE() × hệ số vận động → calcTargetCalories() ± delta → calcMacros() protein cao → calcWater() → estimateBodyFat() (Deurenberg)." },
            { step: "Bước 3", color: "#a78bfa", detail: "Kết quả NutritionResults và UserProfile được JSON.stringify() vào sessionStorage. Không dùng localStorage, không gửi server — dữ liệu mất khi đóng tab." },
            { step: "Bước 4", color: "#10b981", detail: "Results.tsx đọc sessionStorage, gọi getMicronutrients(age, gender, weightKg, targetCalories) → 54 vi chất cá nhân hóa. Hiển thị 5 tab." },
            { step: "Bước 5", color: "#f472b6", detail: "Khi chuyển sang tab Thực đơn: generateMealPlan(macros, microTargets) chọn ngẫu nhiên từ 14 template, scale khẩu phần theo targetCalories, tính mức phủ 11 vi chất." },
          ].map((r) => (
            <div key={r.step} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: r.color, minWidth: 60 }}>{r.step}</span>
              <span style={{ color: "#94a3b8" }}>{r.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture layers */}
      <h2 style={S.h2}><span>🧱</span> Kiến trúc phân tầng</h2>
      <div style={S.card}>
        <Layer color="#06b6d4" title="Routing Layer" items={[
          { name: "App.tsx", file: "src/App.tsx", desc: "BrowserRouter + Routes. 4 route: / | /calculator | /results | /sys. Không có basename (custom domain)." },
          { name: "Layout.tsx", file: "src/components/Layout.tsx", desc: "Sticky header với logo + nav links. Footer với disclaimer. Bọc tất cả page." },
        ]} />
        <Layer color="#10b981" title="Page Layer (UI)" items={[
          { name: "Home",       file: "src/pages/Home.tsx",       desc: "Landing page: hero, tính năng nổi bật, hướng dẫn 3 bước. CTA → /calculator." },
          { name: "Calculator", file: "src/pages/Calculator.tsx", desc: "Form 3 bước (wizard): Profile → Activity → Goal. Validate từng bước. Submit → calculate() → sessionStorage → navigate('/results')." },
          { name: "Results",    file: "src/pages/Results.tsx",    desc: "Đọc sessionStorage. 5 tab: Tổng quan | Amino Acids | Vitamin & Khoáng chất | Hợp chất sinh học | Thực đơn gợi ý. Lazy-generate meal plan khi vào tab." },
          { name: "System",     file: "src/pages/System.tsx",     desc: "Trang này — tài liệu kiến trúc, luồng dữ liệu, mô tả module (không ảnh hưởng business logic)." },
        ]} />
        <Layer color="#f59e0b" title="Business Logic Layer" items={[
          { name: "calculations.ts", file: "src/lib/calculations.ts", desc: "calcBMI, calcBMR (Mifflin-St Jeor), calcTDEE, calcTargetCalories, calcMacros (protein cao theo goal), calcWater (35ml/kg + activity bonus), estimateBodyFat (Deurenberg). Hàm calculate() gọi tất cả." },
          { name: "micronutrients.ts", file: "src/lib/micronutrients.ts", desc: "getMicronutrients(age, gender, weightKg, targetCalories) → 54 vi chất. Amino acids: WHO/FAO/UNU 2007 mg/kg × cân nặng. Vitamin B1/B2/B3: scale theo calo. Chia nhóm tuổi 6 cấp." },
          { name: "mealPlanner.ts", file: "src/lib/mealPlanner.ts", desc: "35 thực phẩm Việt Nam (USDA data). 14 meal template. generateMealPlan() → 5 bữa/ngày, scale khẩu phần theo targetCalories (25/10/35/10/20%). Tính mức phủ 11 vi chất so với microTargets." },
        ]} />
        <Layer color="#a78bfa" title="Type / Contract Layer" items={[
          { name: "types.ts", file: "src/lib/types.ts", desc: "Gender, ActivityLevel, WeightGoal, NutrientCategory. Interface: UserProfile, BMIResult, MacroTargets, NutritionResults, Micronutrient. Không có runtime code — chỉ là contracts TypeScript." },
        ]} />
        <Layer color="#64748b" title="Static Assets" items={[
          { name: "public/CNAME",    desc: "nutritor.zenpax.io.vn — được copy vào dist/ khi build, báo GitHub Pages custom domain." },
          { name: "public/404.html", desc: "SPA redirect: redirect /path → /?p=path để React Router handle deep links trên GitHub Pages." },
          { name: "index.html",      desc: "Entry point. Script khôi phục URL từ ?p= (do 404 redirect). Mount <div id='root'>." },
        ]} />
      </div>

      {/* Module map */}
      <h2 style={S.h2}><span>📦</span> Sơ đồ module</h2>
      <div style={S.card}>
        <div style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 2, color: "#94a3b8" }}>
          {[
            { indent: 0, text: "src/", color: "#f1f5f9" },
            { indent: 1, text: "main.tsx          — Bootstrap React, mount App vào #root", color: "#94a3b8" },
            { indent: 1, text: "App.tsx            — Router + Routes (4 route)", color: "#06b6d4" },
            { indent: 1, text: "components/", color: "#f1f5f9" },
            { indent: 2, text: "Layout.tsx         — Header/Footer wrapper", color: "#94a3b8" },
            { indent: 1, text: "pages/", color: "#f1f5f9" },
            { indent: 2, text: "Home.tsx           — Landing / marketing", color: "#94a3b8" },
            { indent: 2, text: "Calculator.tsx     — Wizard form input", color: "#06b6d4" },
            { indent: 2, text: "Results.tsx        — 5-tab results display", color: "#10b981" },
            { indent: 2, text: "System.tsx         — Trang này (architecture docs)", color: "#a78bfa" },
            { indent: 1, text: "lib/", color: "#f1f5f9" },
            { indent: 2, text: "types.ts           — TypeScript interfaces & enums", color: "#a78bfa" },
            { indent: 2, text: "calculations.ts    — BMI/BMR/TDEE/Macro engine", color: "#f59e0b" },
            { indent: 2, text: "micronutrients.ts  — 54 vi chất cá nhân hóa", color: "#f59e0b" },
            { indent: 2, text: "mealPlanner.ts     — Thực đơn + mức phủ vi chất", color: "#f59e0b" },
            { indent: 0, text: "public/", color: "#f1f5f9" },
            { indent: 1, text: "CNAME              — Custom domain cho GitHub Pages", color: "#64748b" },
            { indent: 1, text: "404.html           — SPA routing shim", color: "#64748b" },
            { indent: 0, text: ".github/workflows/", color: "#f1f5f9" },
            { indent: 1, text: "deploy.yml         — Build + Deploy khi push → main", color: "#64748b" },
          ].map((line, i) => (
            <div key={i} style={{ color: line.color, paddingLeft: line.indent * 20 }}>
              {line.text}
            </div>
          ))}
        </div>
      </div>

      {/* Data structures */}
      <h2 style={S.h2}><span>🗄️</span> Cấu trúc dữ liệu chính</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {[
          {
            name: "UserProfile", color: "#06b6d4",
            fields: ["name: string (optional)", "age: number", "gender: male | female", "heightCm: number", "weightKg: number", "activityLevel: ActivityLevel", "weightGoal: WeightGoal"],
          },
          {
            name: "NutritionResults", color: "#10b981",
            fields: ["bmi: BMIResult", "bmr: number (kcal)", "tdee: number (kcal)", "targetCalories: number", "macros: MacroTargets", "waterMl: number", "bodyFatEstimate?: number"],
          },
          {
            name: "Micronutrient", color: "#f59e0b",
            fields: ["name, unit, icon", "rda: number | null", "category: NutrientCategory", "personalized?: boolean", "deficiency?, excess?", "upperLimit?, suggestion?"],
          },
          {
            name: "DayMealPlan", color: "#f472b6",
            fields: ["meals: PlannedMeal[5]", "  ← items: PlannedItem[]", "  ← grams, display, cal", "totalCal/Protein/Carbs/Fat", "microCoverage: [11 items]", "  ← got, target, pct%"],
          },
        ].map((ds) => (
          <div key={ds.name} style={{ ...S.card, margin: 0, borderLeft: `3px solid ${ds.color}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: ds.color, marginBottom: 10, fontFamily: "monospace" }}>{ds.name}</div>
            {ds.fields.map((f) => (
              <div key={f} style={{ fontSize: 12, color: "#64748b", fontFamily: "monospace", lineHeight: 1.8 }}>{f}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Personalization */}
      <h2 style={S.h2}><span>🎯</span> Logic cá nhân hóa</h2>
      <div style={S.card}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "BMR",            color: "#f59e0b", rule: "Mifflin-St Jeor: 10×kg + 6.25×cm − 5×tuổi ± 161 (giới tính). Chính xác hơn Harris-Benedict cho người hiện đại." },
            { label: "Protein",        color: "#10b981", rule: "Nhân hệ số theo mục tiêu: Giảm nhanh=2.2g/kg · Giảm=2.0 · Duy trì=1.8 · Tăng=2.0 · Tăng nhanh=2.2. Cao hơn chuẩn 0.8g/kg để bảo toàn cơ." },
            { label: "Amino acids",    color: "#06b6d4", rule: "WHO/FAO/UNU 2007: mg/kg/ngày × cân nặng → gram. VD: Leucine 42mg/kg × 65kg = 2.73g/ngày. Trẻ em nhân thêm 1.3×." },
            { label: "Vitamin B1/B2/B3",color:"#a78bfa", rule: "max(giá trị bảng DRI, calo/1000 × hệ số). B1: ×0.5, B2: ×0.6, B3: ×6.6. Người ăn nhiều cần nhiều vitamin chuyển hóa năng lượng hơn." },
            { label: "Nhóm tuổi",      color: "#f472b6", rule: "6 nhóm: child(≤13) · teen(≤18) · young_adult(≤30) · adult(≤50) · senior_early(≤70) · senior(>70). Mỗi nhóm có RDA riêng cho từng vi chất." },
            { label: "Thực đơn",       color: "#ef4444", rule: "Tổng calo chia 5 bữa: 25/10/35/10/20%. Mỗi bữa random 1 template, scale khẩu phần = targetMealCal / baseCal (capped 0.5–2.5×)." },
          ].map((r) => (
            <div key={r.label} style={{ display: "flex", gap: 12, fontSize: 13 }}>
              <span style={{ ...S.badge(r.color), minWidth: 120, textAlign: "center", alignSelf: "flex-start" }}>{r.label}</span>
              <span style={{ color: "#94a3b8", lineHeight: 1.7, flex: 1 }}>{r.rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* State management */}
      <h2 style={S.h2}><span>💾</span> State & lưu trữ</h2>
      <div style={S.card}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {[
            { label: "sessionStorage", color: "#10b981", keys: ["nutri_results → NutritionResults JSON", "nutri_profile → UserProfile JSON"], note: "Mất khi đóng tab. Không cần server." },
            { label: "React useState", color: "#06b6d4", keys: ["Calculator: form state (Partial<UserProfile>)", "Results: tab, mealPlan (DayMealPlan)"], note: "Local component state, không persist." },
            { label: "Không có", color: "#64748b", keys: ["localStorage", "cookies", "IndexedDB", "Backend / API call"], note: "Pure client-side SPA. Không gửi dữ liệu người dùng ra ngoài." },
          ].map((s) => (
            <div key={s.label} style={{ background: "rgba(15,23,42,0.5)", borderRadius: 8, padding: "14px 16px" }}>
              <Badge color={s.color} label={s.label} />
              <div style={{ marginTop: 8 }}>
                {s.keys.map((k) => (
                  <div key={k} style={{ fontSize: 12, color: "#64748b", lineHeight: 1.8, fontFamily: "monospace" }}>• {k}</div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 6 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Known limits */}
      <h2 style={S.h2}><span>⚠️</span> Giới hạn & hướng mở rộng</h2>
      <div style={S.card}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>Giới hạn hiện tại</div>
            {[
              "Không lưu lịch sử tính toán",
              "Không có tài khoản người dùng",
              "Dữ liệu dinh dưỡng thực phẩm giới hạn (~35 món)",
              "Thực đơn ngẫu nhiên, chưa tối ưu hóa đa mục tiêu",
              "Chỉ hỗ trợ tiếng Việt",
              "Không tích hợp dữ liệu Herbalife chính thức",
            ].map((s) => <div key={s} style={{ fontSize: 13, color: "#64748b", lineHeight: 1.8 }}>• {s}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981", marginBottom: 8 }}>Hướng mở rộng</div>
            {[
              "Tích hợp phương pháp tính Herbalife",
              "Mở rộng cơ sở dữ liệu thực phẩm Việt Nam",
              "Lưu lịch sử với localStorage/IndexedDB",
              "Export PDF kết quả",
              "API backend cho tính năng nâng cao",
              "Theo dõi tiến độ theo thời gian",
            ].map((s) => <div key={s} style={{ fontSize: 13, color: "#64748b", lineHeight: 1.8 }}>• {s}</div>)}
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="btn-secondary">← Trang chủ</Link>
        <Link to="/calculator" className="btn-primary">Dùng thử Calculator</Link>
      </div>
    </div>
  );
}
