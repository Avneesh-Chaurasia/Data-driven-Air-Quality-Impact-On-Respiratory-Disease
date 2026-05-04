// src/components/Slide1Hero.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";

const pollutants = [
  { name: 'PM2.5', value: 187, pct: 100, color: 'var(--accent2)'  },
  { name: 'PM10',  value: 143, pct: 76,  color: 'var(--accent3)'  },
  { name: 'O₃',   value: 94,  pct: 50,  color: 'var(--accent)'   },
  { name: 'NO₂',  value: 112, pct: 60,  color: 'var(--purple)'   },
  { name: 'SO₂',  value: 72,  pct: 38,  color: 'var(--accent4)'  },
];

const stats = [
  { val: '7M+',  color: 'var(--accent)',  label: 'Annual deaths linked\nto air pollution' },
  { val: '91%',  color: 'var(--accent3)', label: 'Of world breathes\nsubstandard air'    },
  { val: '300+', color: 'var(--accent2)', label: 'Pollutant datasets\nanalysed'           },
];

export default function Slide1Hero() {
  const barsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      bar.style.animationDelay = `${i * 0.15}s`;
    });
  }, []);

  return (
    <section id="slide-1" style={styles.slide}>
      {/* Grid overlay */}
      <div style={styles.grid} />

      <div style={styles.inner}>
        <div style={styles.layout}>

          {/* ── LEFT: Pollutant Gauge ── */}
          <div style={styles.gaugePanel}>
            <div style={styles.gaugePanelAccent} />
            <div style={styles.eyebrow}>◈ Pollutant Index</div>

            {/* Radar circle */}
            <div style={styles.radarWrap}>
              <div style={styles.radarRing1}>
                <div style={styles.radarRing2}>
                  <span style={{ fontSize: '1.9rem', opacity: .75 }}>🫁</span>
                </div>
              </div>
            </div>

            {/* Bars */}
            <div style={{ marginTop: '1.2rem' }}>
              {pollutants.map((p, i) => (
                <div key={p.name} style={styles.pollutantRow}>
                  <span style={styles.pName}>{p.name}</span>
                  <div style={styles.bTrack}>
                    <div
                      ref={el => barsRef.current[i] = el}
                      style={{
                        ...styles.bFill,
                        width: `${p.pct}%`,
                        background: p.color,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  </div>
                  <span style={styles.pVal}>{p.value}</span>
                </div>
              ))}
            </div>

            <div style={styles.livePill}>
              <span style={styles.dot} />
              LIVE SENSOR FEED
            </div>
          </div>

          {/* ── CENTER: Title ── */}
          <div style={styles.titleBlock}>
            <div style={styles.eyebrow}>◈ College Mini-Project · 2025–26</div>
            <h1 style={styles.h1}>
              AIR <span style={{ color: 'var(--accent)' }}>QUALITY</span>
              <br />IMPACT &amp;
              <br /><span style={{ color: 'var(--accent)' }}>RESPIRATORY</span>
              <br />DISEASE
            </h1>
            <p style={styles.sub}>
              Analysing the correlation between atmospheric pollutant concentrations and the
              prevalence of respiratory disease across urban populations using machine learning.
            </p>
            {/* Button */}
            <div style={styles.btnRow}>
              <button
                style={{ ...styles.btn, ...styles.btnPrimary }}
                onClick={() => navigate("/prediction")} 
              >
                PREDICT AQI →
              </button>
              <a href="#slide-3" style={{ ...styles.btn, ...styles.btnPrimary }}>EXPLORE MAPS →</a>
              <a href="#slide-5" style={{ ...styles.btn, ...styles.btnPrimary }}>TEAM</a>
            </div>
          </div>

          {/* ── RIGHT: Stats ── */}
          <div style={styles.statCol}>
            {stats.map(s => (
              <div key={s.val}>
                <div style={{ ...styles.statNum, color: s.color }}>{s.val}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div style={styles.scrollHint}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        SCROLL DOWN
      </div>

      <style>{`
        .bar-grow { animation: barGrow 1.4s ease-out forwards; transform-origin: left; transform: scaleX(0); }
        @keyframes barGrow { to { transform: scaleX(1); } }
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:.12} }
        @keyframes hintBob{ 0%,100%{opacity:.35;transform:translateX(-50%) translateY(0)} 50%{opacity:.9;transform:translateX(-50%) translateY(7px)} }
      `}</style>
    </section>
  );
}

const styles = {
  slide: {
    height: '100vh',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: 'radial-gradient(ellipse 70% 60% at 18% 52%, #0a2a20 0%, #060d0f 68%)',
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(rgba(0,245,160,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,.1) 1px,transparent 1px)',
    backgroundSize: '64px 64px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  inner: { position: 'relative', zIndex: 1, width: 'min(1240px,94vw)' },
  layout: { display: 'grid', gridTemplateColumns: '300px 1fr 200px', gap: '3rem', alignItems: 'center' },
  gaugePanel: {
    border: '1px solid rgba(0,245,160,.13)',
    background: 'rgba(0,245,160,.025)',
    padding: '1.8rem',
    position: 'relative',
  },
  gaugePanelAccent: {
    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
    background: 'linear-gradient(90deg,var(--accent),transparent)',
  },
  eyebrow: {
    fontFamily: 'var(--mono)', fontSize: '.58rem', color: 'var(--accent)',
    letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: '.9rem',
  },
  radarWrap: { display: 'flex', justifyContent: 'center', marginBottom: '.5rem' },
  radarRing1: {
    width: 110, height: 110, borderRadius: '50%',
    border: '1px solid rgba(0,245,160,.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    animation: 'pulse 2.6s ease-in-out infinite',
  },
  radarRing2: {
    width: 74, height: 74, borderRadius: '50%',
    border: '1px solid rgba(0,245,160,.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    animation: 'pulse 2.6s ease-in-out .5s infinite',
  },
  pollutantRow: { display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.8rem' },
  pName: { fontFamily: 'var(--mono)', fontSize: '.6rem', color: 'var(--muted2)', width: 36, flexShrink: 0 },
  bTrack: { flex: 1, height: 4, background: 'rgba(255,255,255,.05)', borderRadius: 2, overflow: 'hidden' },
  bFill:  { height: '100%', borderRadius: 2, animation: 'barGrow 1.4s ease-out forwards', transformOrigin: 'left', transform: 'scaleX(0)' },
  pVal:   { fontFamily: 'var(--mono)', fontSize: '.6rem', color: 'var(--text)', width: 24, textAlign: 'right', flexShrink: 0 },
  livePill: {
    marginTop: '1.2rem', paddingTop: '1rem',
    borderTop: '1px solid rgba(255,255,255,.06)',
    display: 'flex', alignItems: 'center', gap: '.4rem',
    fontFamily: 'var(--mono)', fontSize: '.52rem', color: 'var(--accent)',
    letterSpacing: '.1em', textTransform: 'uppercase',
    border: '1px solid rgba(0,245,160,.22)', padding: '.3rem .7rem',
  },
  dot: { width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'blink 1.6s ease-in-out infinite', display: 'inline-block' },
  titleBlock: {},
  h1: { fontFamily: 'var(--display)', fontSize: 'clamp(3.2rem,6vw,6.5rem)', lineHeight: .9, margin: '.4rem 0 1rem' },
  sub: {
    fontSize: '.85rem', color: 'var(--muted2)', lineHeight: 1.8, maxWidth: 480,
    borderLeft: '2px solid var(--accent)', paddingLeft: '1rem', marginBottom: '2rem',
  },
  btnRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  btn: {
    fontFamily: 'var(--mono)', fontSize: '.62rem', letterSpacing: '.14em',
    textTransform: 'uppercase', padding: '.8rem 1.8rem',
    cursor: 'pointer', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap',
    transition: 'background .2s, color .2s',
  },
  btnPrimary: { border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent' },
  btnGhost:   { border: '1px solid var(--muted)',  color: 'var(--muted2)', background: 'transparent' },
  statCol: { display: 'flex', flexDirection: 'column', gap: '2.2rem' },
  statNum: { fontFamily: 'var(--display)', fontSize: '3.8rem', lineHeight: 1 },
  statLabel: {
    fontFamily: 'var(--mono)', fontSize: '.55rem', color: 'var(--muted)',
    textTransform: 'uppercase', letterSpacing: '.05em', lineHeight: 1.6, marginTop: '.3rem',
    whiteSpace: 'pre-line',
  },
  scrollHint: {
    position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem',
    fontFamily: 'var(--mono)', fontSize: '.48rem', color: 'var(--muted)',
    letterSpacing: '.15em', textTransform: 'uppercase',
    animation: 'hintBob 2.2s ease-in-out infinite',
  },
};
