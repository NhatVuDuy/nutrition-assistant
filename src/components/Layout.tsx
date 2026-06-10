import { Link, useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
      <header style={{ borderBottom: "1px solid rgba(71,85,105,0.4)", backdropFilter: "blur(10px)", background: "rgba(15,23,42,0.8)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)", borderRadius: 10, padding: 8, display: "flex" }}>
              <Leaf size={20} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 20, color: "#f1f5f9" }}>
              Nutri<span className="text-gradient">Calc</span>
            </span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link
              to="/"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                color: location.pathname === "/" ? "#10b981" : "#94a3b8",
                background: location.pathname === "/" ? "rgba(16,185,129,0.1)" : "transparent",
                transition: "all 0.2s",
              }}
            >
              Trang chủ
            </Link>
            <Link
              to="/calculator"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                color: location.pathname.startsWith("/calculator") ? "#10b981" : "#94a3b8",
                background: location.pathname.startsWith("/calculator") ? "rgba(16,185,129,0.1)" : "transparent",
                transition: "all 0.2s",
              }}
            >
              Tính toán
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer style={{ borderTop: "1px solid rgba(71,85,105,0.3)", padding: "24px", textAlign: "center", color: "#475569", fontSize: 14 }}>
        <p>© 2025 NutriCalc — Tư vấn Dinh dưỡng cá nhân hóa</p>
        <p style={{ marginTop: 4, fontSize: 12, color: "#334155" }}>
          Thông tin mang tính tham khảo, không thay thế tư vấn y tế chuyên nghiệp.
        </p>
        <p style={{ marginTop: 8 }}>
          <Link to="/sys" style={{ fontSize: 12, color: "#334155", textDecoration: "none", opacity: 0.6 }}>
            🏗️ Kiến trúc hệ thống
          </Link>
        </p>
      </footer>
    </div>
  );
}
