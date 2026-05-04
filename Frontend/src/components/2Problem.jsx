import React from "react";

const PROBLEMS = [
  {
    id: "01",
    title: "Poor Air Quality Monitoring",
    role: "Core Problem",
    accentColor: "#4ade80",
    desc: "Existing AQI monitoring stations are sparse, expensive, and delayed across urban regions.",
    tags: ["AQI", "Monitoring", "Latency"],
  },
  {
    id: "02",
    title: "Health Impact Awareness",
    role: "Public Health",
    accentColor: "#facc15",
    desc: "Millions of citizens lack accessible tools to understand how AQI affects their health daily.",
    tags: ["WHO", "PM2.5", "Health"],
  },
  {
    id: "03",
    title: "Reactive, Not Predictive",
    role: "System Gap",
    accentColor: "#fb923c",
    desc: "Current systems only report past data. No scalable ML-based forecasting exists for AQI.",
    tags: ["Forecast", "Prevention"],
  },
  {
    id: "04",
    title: "ML-Powered Prediction",
    role: "Our Solution",
    accentColor: "#22d3ee",
    desc: "Ensemble of RF, XGBoost & LightGBM models trained on 100K+ data points.",
    tags: ["ML", "XGBoost", "LightGBM"],
  },
  {
    id: "05",
    title: "Interactive Dashboard",
    role: "Deliverable",
    accentColor: "#c084fc",
    desc: "A real-time React dashboard with live AQI predictions and health advisories.",
    tags: ["React", "Flask", "Maps"],
  },
];

function Card({ item, index }) {
  const ac = item.accentColor;
  return (
    <div
      style={{
        border: `1px solid ${ac}22`,
        background: "rgba(0,255,180,0.02)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        animation: `fadeUp 0.45s ease-out ${index * 0.065}s both`,
        transition: "border-color 0.3s, background 0.3s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = ac + "66";
        e.currentTarget.style.background = "rgba(0,255,180,0.04)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = ac + "22";
        e.currentTarget.style.background = "rgba(0,255,180,0.02)";
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 2, background: ac, opacity: 0.4, flexShrink: 0 }} />

      {/* Ghost number */}
      <div style={{
        position: "absolute", top: -2, right: 8,
        fontFamily: "monospace", fontSize: "5.5rem",
        color: "rgba(255,255,255,0.03)", lineHeight: 1,
        pointerEvents: "none", userSelect: "none", fontWeight: 900,
      }}>
        {item.id}
      </div>

      {/* Single unified 1rem padding */}
      <div style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        flex: 1,
      }}>
        {/* ID badge + Role badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{
            width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${ac}66`, color: ac, background: ac + "1a",
            fontFamily: "monospace", fontSize: "0.6rem", fontWeight: "bold",
            borderRadius: 4, flexShrink: 0,
          }}>
            {item.id}
          </div>
          <span style={{
            fontFamily: "monospace", fontSize: "0.44rem",
            letterSpacing: "0.08em", color: ac,
            border: `1px solid ${ac}`,
            padding: "0.2rem 0.5rem",
          }}>
            {item.role.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "monospace", fontSize: "1.1rem",
          color: ac, lineHeight: 1, fontWeight: "bold",
        }}>
          {item.title}
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "monospace", fontSize: "0.46rem",
          color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          {item.role}
        </div>

        {/* Description */}
        <div style={{
          fontSize: "0.7rem", color: "rgba(255,255,255,0.45)",
          lineHeight: 1.6, flex: 1,
        }}>
          {item.desc}
        </div>

        {/* Tags row with divider */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0.4rem",
          paddingTop: "0.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "monospace", fontSize: "0.42rem",
              padding: "0.2rem 0.45rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Slide2() {
  return (
    <section
      id="slide-2"
      style={{
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, #0a1f12 0%, #050807 65%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1.5rem",
      }}
    >
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,255,180,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,.015) 1px,transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        width: "min(1240px, 94vw)",
        display: "flex", flexDirection: "column",
        gap: "1.2rem",               // ← tighter vertical gap between all sections
      }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.5rem" }}>
          {/* <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ height: 1, width: 28, background: "rgba(0,255,180,0.3)" }} />
            <span style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.45em", color: "rgba(0,255,180,0.7)", textTransform: "uppercase" }}>
              Slide 02 · Analysis
            </span>
            <div style={{ height: 1, width: 28, background: "rgba(0,255,180,0.3)" }} />
          </div> */}

          {/* ← Reduced from clamp(2.5rem,4.5vw,5rem) to clamp(1.8rem,3vw,3rem) */}
          <h1 style={{
            fontFamily: "monospace",
            fontSize: "clamp(1.8rem, 3vw, 3rem)",
            fontWeight: 900, letterSpacing: "-0.02em",
            color: "#fff", lineHeight: 0.95, margin: 0,
          }}>
            THE{" "}
            <span style={{
              color: "transparent",
              backgroundImage: "linear-gradient(90deg,#facc15,#fb923c)",
              WebkitBackgroundClip: "text", backgroundClip: "text",
            }}>
              PROBLEM
            </span>{" "}
            WE SOLVE
          </h1>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", maxWidth: 460, lineHeight: 1.6, margin: 0 }}>
            Bridging the gap between static environmental data and proactive public health safety through advanced neural forecasting.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
          {PROBLEMS.map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Stats bar — smaller padding and font sizes */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 2fr",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)", overflow: "hidden",
        }}>
          <div style={{
            padding: "0.9rem 1.2rem",
            display: "flex", alignItems: "center", gap: "1rem",
            borderRight: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div style={{ width: 3, height: 36, background: "linear-gradient(to bottom, #4ade80, #22d3ee)", borderRadius: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.46rem", color: "#4ade80", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 0.2rem" }}>
                Final Objective
              </p>
              <h4 style={{ color: "#fff", fontWeight: "bold", fontSize: "0.9rem", margin: "0 0 0.15rem" }}>
                Predictive Intelligence Dashboard
              </h4>
              <p style={{ fontFamily: "monospace", fontSize: "0.46rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
                Real-time forecasting for safer urban living.
              </p>
            </div>
          </div>

          <div style={{ padding: "0.9rem 1.2rem", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            {[
              { val: "4",     label: "ML Models", color: "#4ade80" },
              { val: "800K+", label: "Samples",   color: "#22d3ee" },
              { val: "28",    label: "Cities",    color: "#c084fc" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "monospace", fontSize: "1.3rem", fontWeight: 900, color: s.color, lineHeight: 1, margin: "0 0 0.35rem" }}>
                  {s.val}
                </p>
                <p style={{ fontFamily: "monospace", fontSize: "0.4rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}