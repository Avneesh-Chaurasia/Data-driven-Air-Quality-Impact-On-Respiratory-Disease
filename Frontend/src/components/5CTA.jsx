// src/components/Slide6CTA.jsx
import React from 'react';

const IMPACT_STATS = [
  { val:'7M+',   color:'var(--accent)',  label:'Annual deaths\nfrom pollution'  },
  { val:'91%',   color:'var(--accent3)', label:'World breathes\nunsafe air'     },
  { val:'92.8%', color:'var(--accent4)', label:'Best model\nR² score'           },
  { val:'300+',  color:'var(--accent2)', label:'Datasets\nanalysed'             },
  { val:'8',     color:'var(--purple)',  label:'ML algorithms\ntested'          },
];

export default function Slide6CTA() {
  return (
    <section id="slide-5" style={styles.slide}>
      <div style={styles.grid} />

      {/* Background pulse rings */}
      {[600, 400, 220].map((size, i) => (
        <div key={size} style={{
          position:'absolute', width:size, height:size,
          borderRadius:'50%', border:`1px solid rgba(0,245,160,${0.05 + i*.02})`,
          animation:`ctaPulse 3s ease-in-out ${i*.5}s infinite`,
          pointerEvents:'none', zIndex:0,
        }}/>
      ))}

      <div style={{ ...styles.inner, textAlign:'center', position:'relative', zIndex:1, padding:'2rem 0', marginTop:'4rem' }}>

        {/* <div style={{ ...styles.eyebrow, justifyContent:'center', display:'flex' }}>◈ Slide 06 / Call to Action</div> */}

        <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(2rem,6vw,6.5rem)', lineHeight:1, marginBottom:'1rem', maxWidth:'90vw', marginInline:'auto'}}>
          BREATHE<br />
          <span style={{ color:'var(--accent)' }}>BETTER</span><br />
          DATA
        </h2>

        <p style={{ fontSize:'clamp(0.7rem, 1vw, 0.9rem)', color:'var(--muted2)', maxWidth:480, margin:'0 auto 2.5rem', lineHeight:1.8 }}>
          Our project shows that predictive air quality models empower cities to issue preemptive health advisories,
          reduce pollution exposure, and save lives. Join the movement.
        </p>

        {/* CTA Buttons */}
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'3rem' }}>
          {[
            // { 
            //   label:'DOWNLOAD PAPER →', 
            //   primary:true, href:'', 
            //   download:true
            // },
            { 
              label:'VIEW GITHUB REPO', 
              primary:false, 
              href:'https://github.com/Avneesh-Chaurasia/Data-driven-Air-Quality-Impact-On-Respiratory-Disease' 
            },
            { label:'↑ BACK TO TOP', 
              primary:false, 
              href:'#slide-1' },
          ].map(b => (
            <a 
              key={b.label} 
              href={b.href || '#'}
              {...(b.download && { download: "AQI_Research_Paper.pdf" })}
              style={{
                fontFamily:'var(--mono)',
                fontSize:'clamp(0.55rem,0.8vw,0.7rem)',
                letterSpacing:'.14em',
                textTransform:'uppercase',
                padding:'1rem 2.5rem',
                border:`1px solid ${b.primary ? 'var(--accent)' : 'var(--muted)'}`,
                color:b.primary ? 'var(--accent)' : 'var(--muted2)',
                background:'transparent',
                cursor:'pointer',
                textDecoration:'none',
                transition:'background .2s,color .2s',
                display:'inline-block',
                whiteSpace:'nowrap'
              }}
              onMouseEnter={e => { e.target.style.background = b.primary ? 'var(--accent)' : 'var(--muted)'; e.target.style.color = '#060d0f'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = b.primary ? 'var(--accent)' : 'var(--muted2)'; }}
            >
              {b.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`@keyframes ctaPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}}`}</style>
    </section>
  );
}

const styles = {
  slide: { height:'100vh', scrollSnapAlign:'start', scrollSnapStop:'always', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding: 'clamp(1rem, 3vw, 3rem)', background:'radial-gradient(ellipse 80% 65% at 50% 50%, #071a0f 0%, #060d0f 70%)' },
  grid:  { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,245,160,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,.08) 1px,transparent 1px)', backgroundSize:'clamp(32px,5vw,64px) clamp(32px,5vw,64px)', pointerEvents:'none', zIndex:0 },
  inner: { position:'relative', zIndex:1, width:'min(1100px,95vw)' },
  eyebrow: { fontFamily:'var(--mono)', fontSize:'clamp(0.5rem, 0.8vw, 0.7rem)', color:'var(--accent)', letterSpacing:'.25em', textTransform:'uppercase', marginBottom:'1rem' },
};
