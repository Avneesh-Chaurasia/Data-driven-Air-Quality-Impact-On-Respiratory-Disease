// src/components/Slide4Algorithms.jsx
import React, { useState } from 'react';

const ALGOS = [
  { name:'Linear Regression',tag:'Linear · Regularised', icon:'📈', color:'var(--muted2)', r2:'0.928', mse:'185.76', mae:'8.45', badge:'BASELINE', badgeColor:'var(--muted)',   desc:'L2-regularised linear model as baseline. Interpretable coefficients reveal direct pollutant relationships.' },
  { name:'Random Forest',tag:'Ensemble · Bagging', icon:'🌲', color:'var(--accent)',  r2:'0.891', mse:'283.35', mae:'9.95', badge:'ROBUST', badgeColor:'var(--accent)',  desc:'Ensemble of decision trees. Robust to noise and handles non-linear relationships but less optimized than boosting methods.' },
  { name:'XGBoost',tag:'Ensemble · Boosting', icon:'⚡', color:'var(--accent3)', r2:'0.973', mse:'70.45', mae:'4.85', badge:'SECOND BEST', badgeColor:'var(--accent3)', desc:'Gradient-boosted trees with regularization. Strong performance on complex AQI feature interactions.' },
  { name:'LightGBM',tag:'Ensemble · Boosting', icon:'🚀', color:'var(--accent4)', r2:'0.975', mse:'64.40', mae:'4.74', badge:'BEST', badgeColor:'var(--accent3)', desc:'Lightweight gradient boosting model delivering highest accuracy and lowest error on AQI prediction.' },
];

const sorted = [...ALGOS].sort((a,b) => parseFloat(b.r2) - parseFloat(a.r2));

function AlgoCard({ algo, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? algo.color : 'rgba(0,245,160,.13)'}`,
        background: hovered ? 'rgba(0,245,160,.04)' : 'rgba(0,245,160,.02)',
        padding: '1rem',
        display: 'flex', flexDirection: 'column', gap: '.5rem',
        cursor: 'default',
        transition: 'border-color .3s, background .3s',
        animation: `fadeUp .45s ease-out ${index * 0.065}s both`,
        position: 'relative',
      }}
    >
      {/* Ghost number */}
      <div style={{ position:'absolute', top:-2, right:8, fontFamily:'var(--display)', fontSize:'5.5rem', color:'rgba(0,245,160,.04)', lineHeight:1, pointerEvents:'none', userSelect:'none' }}>
        {String(index+1).padStart(2,'0')}
      </div>

      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <span style={{ fontSize:'1.3rem', lineHeight:1 }}>{algo.icon}</span>
        {algo.badge && (
          <span style={{ fontFamily:'var(--mono)', fontSize:'.44rem', padding:'.2rem .5rem', border:`1px solid ${algo.badgeColor}`, color:algo.badgeColor, letterSpacing:'.08em' }}>
            {algo.badge}
          </span>
        )}
      </div>
      <div style={{ fontFamily:'var(--display)', fontSize:'1.1rem', color:algo.color, lineHeight:1 }}>{algo.name}</div>
      <div style={{ fontFamily:'var(--mono)', fontSize:'.46rem', color:'var(--muted)', letterSpacing:'.1em' }}>{algo.tag}</div>
      <div style={{ fontSize:'.7rem', color:'var(--muted2)', lineHeight:1.6, flex:1 }}>{algo.desc}</div>
      <div style={{ display:'flex', gap:'.8rem', paddingTop:'.5rem', borderTop:'1px solid rgba(255,255,255,.06)' }}>
        <Metric val={algo.r2}   label="R²"   color={algo.color} />
        <Metric val={algo.mse} label="MSE" color="var(--accent2)" />
        <Metric val={algo.mae}  label="MAE"  color="var(--accent3)" />
      </div>
    </div>
  );
}

function Metric({ val, label, color }) {
  return (
    <div>
      <div style={{ fontFamily:'var(--mono)', fontSize:'.55rem', color }}>{val}</div>
      <div style={{ fontFamily:'var(--mono)', fontSize:'.42rem', color:'var(--muted)' }}>{label}</div>
    </div>
  );
}

export default function Slide4Algorithms() {
  return (
    <section id="slide-5" style={styles.slide}>
      <div style={styles.grid} />
      <div style={{ ...styles.inner, height:'88vh', display:'flex', flexDirection:'column', gap:'1rem', padding:'1rem 0' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexShrink:0 }}>
          <div>
            <div style={styles.eyebrow}>◈ Slide 05 / Machine Learning</div>
            <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(2.5rem,4.5vw,5rem)', lineHeight:.9 }}>
              ALGORITHM <span style={{ color:'var(--accent4)' }}>ARSENAL</span>
            </h2>
          </div>
          <div style={{ fontFamily:'var(--mono)', fontSize:'.58rem', color:'var(--muted2)' }}>
            Evaluated on: MAE · MSE · R²
          </div>
        </div>

        {/* Cards 4×2 */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', flex:0.8, alignContent:'start' }}>
          {ALGOS.map((a, i) => <AlgoCard key={a.name} algo={a} index={i} />)}
        </div>

        {/* Accuracy bars */}
        <div style={{ ...styles.panel, padding:'1rem', flexShrink:0, marginTop:'.7rem' }}>
          <div style={styles.eyebrow}>◈ MODEL ACCURACY COMPARISON (R² SCORE)</div>
          <div style={{ display:'flex', flexDirection:'column', gap:'.5rem' }}>
            {sorted.map(a => (
              <div key={a.name} style={{ display:'flex', alignItems:'center', gap:'.8rem' }}>
                <div style={{ fontFamily:'var(--mono)', fontSize:'.7rem', color:'var(--muted2)', width:120, flexShrink:0 }}>{a.name}</div>
                <div style={{ flex:1, height:5, background:'rgba(255,255,255,.04)', borderRadius:2, overflow:'hidden' }}>
                  <div style={{ height:'100%', background:a.color, width:`${parseFloat(a.r2)*100}%`, borderRadius:2, transition:'width 1.2s ease-out' }} />
                </div>
                <div style={{ fontFamily:'var(--mono)', fontSize:'.5rem', color:a.color, width:34, textAlign:'right' }}>{a.r2}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div style={styles.scrollHint}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        SCROLL
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes hintBob{0%,100%{opacity:.35;transform:translateX(-50%) translateY(0)}50%{opacity:.9;transform:translateX(-50%) translateY(7px)}}`}</style>
    </section>
  );
}

const styles = {
  slide: { height:'100vh', scrollSnapAlign:'start', scrollSnapStop:'always', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'radial-gradient(ellipse 60% 50% at 20% 80%, #0a0a1f 0%, #060d0f 65%)' },
  grid:  { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,245,160,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,.08) 1px,transparent 1px)', backgroundSize:'64px 64px', pointerEvents:'none', zIndex:0 },
  inner: { position:'relative', zIndex:1, width:'min(1240px,94vw)' },
  eyebrow: { fontFamily:'var(--mono)', fontSize:'.58rem', color:'var(--accent)', letterSpacing:'.25em', textTransform:'uppercase', marginBottom:'.7rem' },
  panel: { border:'1px solid rgba(0,245,160,.13)', background:'rgba(0,245,160,.02)', position:'relative' },
  scrollHint: { position:'absolute', bottom:'1.5rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'.35rem', fontFamily:'var(--mono)', fontSize:'.48rem', color:'var(--muted)', letterSpacing:'.15em', textTransform:'uppercase', animation:'hintBob 2.2s ease-in-out infinite' },
};
