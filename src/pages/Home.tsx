import { Link } from "react-router-dom";
import { Activity, Calculator, Apple, Droplets, ChevronRight, Zap, Target, PieChart } from "lucide-react";

const features = [
  {
    icon: <Activity size={24} color="#10b981" />,
    bg: "rgba(16,185,129,0.1)",
    title: "BMI & Phân loại",
    desc: "Chỉ số khối cơ thể theo WHO, phân loại chi tiết từ thiếu cân đến béo phì.",
  },
  {
    icon: <Zap size={24} color="#f59e0b" />,
    bg: "rgba(245,158,11,0.1)",
    title: "BMR & TDEE",
    desc: "Tính trao đổi chất cơ bản và nhu cầu calo hàng ngày theo mức độ vận động.",
  },
  {
    icon: <PieChart size={24} color="#8b5cf6" />,
    bg: "rgba(139,92,246,0.1)",
    title: "Macro Dinh dưỡng",
    desc: "Phân chia Protein, Tinh bột, Chất béo tối ưu theo mục tiêu cân nặng.",
  },
  {
    icon: <Apple size={24} color="#ef4444" />,
    bg: "rgba(239,68,68,0.1)",
    title: "Vi chất dinh dưỡng",
    desc: "RDA của 20+ vitamin và khoáng chất thiết yếu theo độ tuổi và giới tính.",
  },
  {
    icon: <Droplets size={24} color="#06b6d4" />,
    bg: "rgba(6,182,212,0.1)",
    title: "Nhu cầu nước",
    desc: "Lượng nước cần uống mỗi ngày dựa trên cân nặng và mức độ hoạt động.",
  },
  {
    icon: <Target size={24} color="#10b981" />,
    bg: "rgba(16,185,129,0.1)",
    title: "Mục tiêu cá nhân",
    desc: "Lộ trình dinh dưỡng phù hợp: giảm cân, tăng cân hoặc duy trì thể trạng.",
  },
];

const steps = [
  { num: "01", title: "Nhập thông tin", desc: "Cung cấp tuổi, giới tính, chiều cao, cân nặng" },
  { num: "02", title: "Chọn mục tiêu", desc: "Mức độ vận động và mục tiêu cân nặng của bạn" },
  { num: "03", title: "Nhận kết quả", desc: "Bộ chỉ số dinh dưỡng đầy đủ và cá nhân hóa" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)", marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
          <span style={{ fontSize: 13, color: "#10b981", fontWeight: 500 }}>Hoàn toàn miễn phí · Không cần đăng ký</span>
        </div>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 800, lineHeight: 1.1, color: "#f1f5f9", marginBottom: 20 }}>
          Tư vấn{" "}
          <span className="text-gradient">Dinh dưỡng</span>
          <br />cá nhân hóa
        </h1>

        <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
          Tính toán đầy đủ các chỉ số dinh dưỡng thiết yếu: BMI, BMR, TDEE, Macros,
          Vi chất và Nhu cầu nước — dựa trên thông tin cá nhân của bạn.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/calculator" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
            <Calculator size={20} />
            Bắt đầu tính toán
            <ChevronRight size={16} />
          </Link>
          <a
            href="#features"
            className="btn-secondary"
            style={{ fontSize: 16, padding: "14px 32px" }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Xem tính năng
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
          {[
            { value: "20+", label: "Vi chất dinh dưỡng" },
            { value: "5", label: "Mức độ vận động" },
            { value: "100%", label: "Miễn phí & Riêng tư" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700 }} className="text-gradient">{stat.value}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>
            Đầy đủ chỉ số dinh dưỡng
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>
            Tất cả những gì bạn cần để hiểu và tối ưu hóa chế độ dinh dưỡng
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} className="card card-hover" style={{ padding: 24 }}>
              <div className="feature-icon" style={{ background: f.bg }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#f1f5f9", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>
            Chỉ 3 bước đơn giản
          </h2>
        </div>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ flex: "1 1 220px", maxWidth: 260, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              {i > 0 && (
                <div style={{ display: "none" }} />
              )}
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontWeight: 700, fontSize: 16, color: "white" }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9", marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link to="/calculator" className="btn-primary" style={{ fontSize: 16, padding: "14px 36px" }}>
            <Calculator size={20} />
            Bắt đầu ngay
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div style={{ maxWidth: 700, margin: "0 auto 60px", padding: "0 24px" }}>
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "16px 20px", color: "#fbbf24", fontSize: 13, lineHeight: 1.6, textAlign: "center" }}>
          ⚠️ <strong>Lưu ý:</strong> Các kết quả chỉ mang tính chất tham khảo dựa trên công thức khoa học phổ biến.
          Hãy tham khảo bác sĩ hoặc chuyên gia dinh dưỡng để có kế hoạch cá nhân hóa chính xác hơn.
        </div>
      </div>
    </div>
  );
}
