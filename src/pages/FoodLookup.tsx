import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Settings, X, Info } from "lucide-react";
import {
  searchFoods,
  getFoodDetail,
  extractValue,
  formatValue,
  getApiKey,
  saveApiKey,
  translateQuery,
  NUTRIENT_MAP,
  REFERENCE_RDA,
  type SearchFood,
  type FoodDetail,
  type NutrientCategory,
} from "../lib/usdaApi";

type DisplayTab = NutrientCategory | "macro";

const TAB_CONFIG: { id: DisplayTab; label: string; color: string }[] = [
  { id: "macro",      label: "🔥 Macro",            color: "#f59e0b" },
  { id: "vitamin",    label: "🧬 Vitamin",           color: "#a78bfa" },
  { id: "mineral",    label: "🦴 Khoáng chất",       color: "#06b6d4" },
  { id: "amino_acid", label: "💪 Amino Acid",        color: "#10b981" },
  { id: "fatty_acid", label: "🐟 Axit béo",          color: "#f472b6" },
  { id: "bioactive",  label: "🧪 Hợp chất sinh học", color: "#fb923c" },
];

function ApiKeyModal({ onClose }: { onClose: () => void }) {
  const [key, setKey] = useState(getApiKey() === "DEMO_KEY" ? "" : getApiKey());

  const save = () => {
    saveApiKey(key);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#1e293b", border: "1px solid rgba(71,85,105,0.5)", borderRadius: 16, padding: 28, maxWidth: 460, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9" }}>⚙️ Cài đặt API Key USDA</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><X size={18} /></button>
        </div>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16, lineHeight: 1.6 }}>
          Mặc định dùng <code style={{ color: "#10b981" }}>DEMO_KEY</code> (30 req/giờ, 50/ngày).
          Đăng ký key miễn phí tại{" "}
          <span style={{ color: "#06b6d4" }}>fdc.nal.usda.gov/api-guide.html</span>{" "}
          để tăng giới hạn lên 3500 req/ngày.
        </p>
        <input
          type="text"
          className="input-field"
          placeholder="Nhập API key (để trống để dùng DEMO_KEY)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" onClick={save} style={{ flex: 1 }}>Lưu</button>
          <button className="btn-secondary" onClick={() => { saveApiKey(""); onClose(); }}>Xóa key</button>
        </div>
      </div>
    </div>
  );
}

function PortionBar({ grams, onChange }: { grams: number; onChange: (g: number) => void }) {
  const presets = [50, 100, 150, 200, 300];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "12px 16px", background: "rgba(71,85,105,0.15)", borderRadius: 10, marginBottom: 20 }}>
      <span style={{ fontSize: 13, color: "#94a3b8", minWidth: 70 }}>Khẩu phần:</span>
      {presets.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            padding: "4px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500,
            border: "1px solid",
            background: grams === p ? "rgba(16,185,129,0.2)" : "transparent",
            borderColor: grams === p ? "rgba(16,185,129,0.6)" : "rgba(71,85,105,0.4)",
            color: grams === p ? "#10b981" : "#64748b",
            cursor: "pointer",
          }}
        >
          {p}g
        </button>
      ))}
      <input
        type="number"
        min={1}
        max={2000}
        value={grams}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value)))}
        style={{ width: 72, padding: "4px 8px", background: "rgba(71,85,105,0.2)", border: "1px solid rgba(71,85,105,0.4)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, textAlign: "center" }}
      />
      <span style={{ fontSize: 12, color: "#64748b" }}>gram</span>
    </div>
  );
}

function NutrientTabContent({ food, tab, grams }: { food: FoodDetail; tab: DisplayTab; grams: number }) {
  const scale = grams / 100;
  const nutrients = NUTRIENT_MAP.filter((n) => n.category === tab);
  const color = TAB_CONFIG.find((t) => t.id === tab)?.color ?? "#10b981";

  const rows = nutrients.map((n) => {
    const per100 = extractValue(food, n.usdaId);
    const value = per100 !== null ? per100 * scale : null;
    const rda = REFERENCE_RDA[n.usdaId];
    const pct = value !== null && rda ? Math.round((value / rda) * 100) : null;
    return { n, value, pct };
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(71,85,105,0.3)" }}>
            {["", "Chất dinh dưỡng", `Per ${grams}g`, "Đơn vị", "% RDA*"].map((h) => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#64748b", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ n, value, pct }, i) => {
            const missing = value === null;
            return (
              <tr key={n.usdaId} style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(71,85,105,0.12)" : "none", opacity: missing ? 0.35 : 1 }}>
                <td style={{ padding: "9px 12px", fontSize: 18 }}>{n.icon}</td>
                <td style={{ padding: "9px 12px", color: "#e2e8f0", fontWeight: 500 }}>{n.name}</td>
                <td style={{ padding: "9px 12px", color: missing ? "#475569" : color, fontWeight: 600 }}>
                  {missing ? "—" : formatValue(value!, n.unit)}
                </td>
                <td style={{ padding: "9px 12px", color: "#64748b" }}>{n.unit}</td>
                <td style={{ padding: "9px 12px" }}>
                  {pct !== null ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 60, height: 6, background: "rgba(71,85,105,0.3)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: pct >= 80 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444", borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, color: pct >= 80 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444" }}>{pct}%</span>
                    </div>
                  ) : (
                    <span style={{ color: "#334155", fontSize: 12 }}>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ fontSize: 11, color: "#334155", marginTop: 12 }}>* % RDA tham chiếu người trưởng thành nam 30 tuổi, 2000 kcal/ngày.</p>
    </div>
  );
}

export default function FoodLookup() {
  const [query, setQuery] = useState("");
  const [translated, setTranslated] = useState("");
  const [results, setResults] = useState<SearchFood[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedFood, setSelectedFood] = useState<SearchFood | null>(null);
  const [foodDetail, setFoodDetail] = useState<FoodDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<DisplayTab>("macro");
  const [grams, setGrams] = useState(100);
  const [showApiSettings, setShowApiSettings] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setResults([]); setShowDropdown(false); return; }
    setSearching(true);
    setSearchError(null);
    try {
      const foods = await searchFoods(q.trim());
      setResults(foods);
      setShowDropdown(true);
    } catch (e) {
      setSearchError((e as Error).message);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const q = query.trim();
    setTranslated(q.length >= 2 ? translateQuery(q) : "");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(q), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, doSearch]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectFood = async (food: SearchFood) => {
    setSelectedFood(food);
    setShowDropdown(false);
    setFoodDetail(null);
    setDetailError(null);
    setLoadingDetail(true);
    try {
      const detail = await getFoodDetail(food.fdcId);
      setFoodDetail(detail);
    } catch (e) {
      setDetailError((e as Error).message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const clearFood = () => {
    setSelectedFood(null);
    setFoodDetail(null);
    setQuery("");
    setResults([]);
  };

  const dataTypeLabel = (dt: string) => {
    if (dt === "Foundation") return { label: "Foundation", color: "#10b981" };
    if (dt === "SR Legacy") return { label: "SR Legacy", color: "#06b6d4" };
    if (dt === "Branded") return { label: "Branded", color: "#f59e0b" };
    return { label: dt, color: "#94a3b8" };
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>🔍 Tra cứu dinh dưỡng thực phẩm</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>
            Dữ liệu từ <strong style={{ color: "#10b981" }}>USDA FoodData Central</strong> — cơ sở dữ liệu dinh dưỡng quốc gia Hoa Kỳ (700k+ thực phẩm, 60+ chất dinh dưỡng).
            Hỗ trợ tìm kiếm bằng tiếng Việt.
          </p>
        </div>
        <button
          onClick={() => setShowApiSettings(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(71,85,105,0.4)", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13, whiteSpace: "nowrap" }}
        >
          <Settings size={14} /> API Key
        </button>
      </div>

      {/* Search box */}
      <div ref={searchRef} style={{ position: "relative", marginBottom: 24 }}>
        <div style={{ position: "relative" }}>
          <Search size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
          <input
            type="text"
            className="input-field"
            placeholder="Nhập tên thực phẩm (VD: ức gà, cá hồi, bông cải xanh, salmon…)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            style={{ paddingLeft: 44, paddingRight: query ? 40 : 16 }}
          />
          {query && (
            <button onClick={clearFood} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", cursor: "pointer" }}>
              <X size={16} />
            </button>
          )}
        </div>

        {translated && translated !== query.trim() && (
          <div style={{ marginTop: 6, fontSize: 12, color: "#64748b", paddingLeft: 4 }}>
            🔄 Tìm kiếm với: <strong style={{ color: "#10b981" }}>{translated}</strong>
          </div>
        )}

        {searching && (
          <div style={{ marginTop: 6, fontSize: 12, color: "#64748b", paddingLeft: 4 }}>Đang tìm kiếm…</div>
        )}

        {searchError && (
          <div style={{ marginTop: 8, padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, fontSize: 13, color: "#fca5a5" }}>
            ⚠️ {searchError}
          </div>
        )}

        {showDropdown && results.length > 0 && (
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#1e293b", border: "1px solid rgba(71,85,105,0.5)", borderRadius: 12, zIndex: 100, maxHeight: 340, overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
            {results.map((food, i) => {
              const dt = dataTypeLabel(food.dataType);
              return (
                <div
                  key={food.fdcId}
                  onClick={() => selectFood(food)}
                  style={{ padding: "12px 16px", cursor: "pointer", borderBottom: i < results.length - 1 ? "1px solid rgba(71,85,105,0.2)" : "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(71,85,105,0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500, lineHeight: 1.4 }}>{food.description}</div>
                      {food.foodCategory && (
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{food.foodCategory}</div>
                      )}
                    </div>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, background: `${dt.color}20`, color: dt.color, border: `1px solid ${dt.color}30`, whiteSpace: "nowrap" }}>
                      {dt.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showDropdown && !searching && results.length === 0 && query.trim().length >= 2 && (
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#1e293b", border: "1px solid rgba(71,85,105,0.3)", borderRadius: 12, zIndex: 100, padding: "20px 16px", textAlign: "center" }}>
            <p style={{ color: "#64748b", fontSize: 14 }}>Không tìm thấy kết quả. Thử từ khóa tiếng Anh hoặc kiểm tra API key.</p>
          </div>
        )}
      </div>

      {loadingDetail && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <p>Đang tải thông tin dinh dưỡng…</p>
        </div>
      )}

      {detailError && (
        <div style={{ padding: "16px 20px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, color: "#fca5a5", fontSize: 14 }}>
          ⚠️ {detailError}
        </div>
      )}

      {/* Food detail */}
      {selectedFood && foodDetail && !loadingDetail && (
        <div>
          <div className="metric-card" style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 6, lineHeight: 1.3 }}>
                  {foodDetail.description}
                </h2>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(() => { const dt = dataTypeLabel(foodDetail.dataType); return (
                    <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 8, background: `${dt.color}20`, color: dt.color, border: `1px solid ${dt.color}30` }}>
                      {dt.label}
                    </span>
                  ); })()}
                  {typeof foodDetail.foodCategory === "string" && foodDetail.foodCategory && (
                    <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 8, background: "rgba(71,85,105,0.2)", color: "#94a3b8", border: "1px solid rgba(71,85,105,0.3)" }}>
                      {foodDetail.foodCategory}
                    </span>
                  )}
                  {typeof foodDetail.foodCategory === "object" && foodDetail.foodCategory && (
                    <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 8, background: "rgba(71,85,105,0.2)", color: "#94a3b8", border: "1px solid rgba(71,85,105,0.3)" }}>
                      {(foodDetail.foodCategory as { description: string }).description}
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: "#475569" }}>FDC ID: {foodDetail.fdcId}</span>
                </div>
              </div>
              <button onClick={clearFood} style={{ background: "rgba(71,85,105,0.2)", border: "1px solid rgba(71,85,105,0.4)", borderRadius: 8, color: "#94a3b8", cursor: "pointer", padding: "6px 10px" }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <Info size={14} color="#10b981" />
              <p style={{ fontSize: 12, color: "#64748b" }}>
                Giá trị tính trên <strong style={{ color: "#e2e8f0" }}>{grams}g</strong>. Thay đổi khẩu phần bên dưới.
              </p>
            </div>
          </div>

          <PortionBar grams={grams} onChange={setGrams} />

          <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(71,85,105,0.3)", flexWrap: "wrap" }}>
            {TAB_CONFIG.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: "9px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer",
                  background: "transparent", border: "none",
                  borderBottom: activeTab === t.id ? `2px solid ${t.color}` : "2px solid transparent",
                  color: activeTab === t.id ? t.color : "#64748b",
                  marginBottom: -1,
                  transition: "color 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="metric-card">
            <NutrientTabContent food={foodDetail} tab={activeTab} grams={grams} />
          </div>

          {foodDetail.publicationDate && (
            <p style={{ fontSize: 12, color: "#334155", marginTop: 16, textAlign: "center" }}>
              Nguồn: USDA FoodData Central · Cập nhật: {foodDetail.publicationDate}
            </p>
          )}
        </div>
      )}

      {/* Empty state */}
      {!selectedFood && !loadingDetail && (
        <div style={{ textAlign: "center", padding: "60px 24px", color: "#475569" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🥦</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#64748b", marginBottom: 8 }}>Tra cứu bất kỳ thực phẩm nào</h3>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, maxWidth: 420, margin: "0 auto" }}>
            Nhập tên thực phẩm vào ô tìm kiếm. Hỗ trợ tiếng Việt (gà, cá hồi, rau muống…) và tiếng Anh.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {["ức gà", "cá hồi", "bông cải xanh", "trứng gà", "đậu phụ", "chuối"].map((hint) => (
              <button
                key={hint}
                onClick={() => setQuery(hint)}
                style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid rgba(71,85,105,0.35)", background: "rgba(71,85,105,0.1)", color: "#94a3b8", cursor: "pointer", fontSize: 13 }}
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      )}

      {showApiSettings && <ApiKeyModal onClose={() => setShowApiSettings(false)} />}
    </div>
  );
}
