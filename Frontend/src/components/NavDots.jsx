// src/components/NavDots.jsx
import React, { useEffect, useState } from 'react';

const SLIDES = [
  { id:'slide-1', label:'01 / HERO'       },
  { id:'slide-2', label:'02 / PROBLEM' },
  { id:'slide-3', label:'03 / PREDICTION'       },
  { id:'slide-4', label:'04 / MAPS' },
  { id:'slide-5', label:'05 / ALGORITHM'       },
  { id:'slide-6', label:'06 / CTA'        },
];

export function NavDots({ active, onDotClick }) {
  return (
    <nav style={{ position:'fixed', right:'1.8rem', top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:10, zIndex:200 }}>
      {SLIDES.map((s, i) => (
        <button key={s.id} title={s.label} onClick={() => onDotClick(s.id)}
          style={{ width:7, height:7, borderRadius:'50%', background: active===i ? 'var(--accent)' : 'var(--muted)', border:'none', padding:0, cursor:'pointer', transition:'background .3s, transform .3s', transform: active===i ? 'scale(1.6)' : 'scale(1)' }}
        />
      ))}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:.12}}`}</style>
    </nav>
  );
}

export function SlideLabel({ label }) {
  return null;
  // return (
  //   <div style={{ position:'fixed', top:'1.4rem', left:'50%', transform:'translateX(-50%)', fontFamily:'var(--mono)', fontSize:'.52rem', color:'var(--muted)', letterSpacing:'.15em', textTransform:'uppercase', zIndex:200, border:'1px solid rgba(0,245,160,.13)', padding:'.25rem .8rem', background:'rgba(6,13,15,.75)', backdropFilter:'blur(10px)' }}>
  //     {label}
  //   </div>
  // );
}

export function SlideCounter({ current }) {
  return (
    <div style={{ position:'fixed', left:'2rem', bottom:'2.8rem', fontFamily:'var(--mono)', fontSize:'.6rem', color:'var(--muted)', letterSpacing:'.1em', zIndex:200 }}>
      <span style={{ color:'var(--accent)' }}>{String(current+1).padStart(2,'0')}</span> / 06
    </div>
  );
}

export function StatusBar() {
  const [time, setTime] = useState('');
  const [aqi, setAqi] = useState('...');

  // ⏰ REAL-TIME IST CLOCK
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' IST'
      );
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // 🌍 REAL-TIME AQI (API READY)
  useEffect(() => {
    const fetchAQI = async () => {
      const fetchData = async (lat, lon) => {
        try {
          const res = await fetch(
            `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${"6bc8a4f01727157ea5ccd8f8a9bb69c195dd0e37"}`
          );
          const data = await res.json();
          console.log("AQI API:", data);

          if (data.status !== "ok") throw new Error("Invalid AQI response");

          const aqiValue = data.data.aqi;

          setAqi(aqiValue);
        } catch (err) {
          console.error("AQI fetch error:", err);
          setAqi("N/A");
        }
      };

      // ✅ Try getting user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            fetchData(lat, lon);
          },
          () => {
            fetchData(19.0760, 72.8777);
          }
        );
      } else {
        fetchData(19.0760, 72.8777);
      }
    };

    fetchAQI();
    const interval = setInterval(fetchAQI, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position:'fixed', bottom:0, left:0, right:0, display:'flex', gap:'2.5rem', padding:'.55rem 2rem', background:'rgba(6,13,15,.92)', borderTop:'1px solid rgba(0,245,160,.13)', fontFamily:'var(--mono)', fontSize:'.52rem', color:'var(--muted2)', zIndex:200, backdropFilter:'blur(12px)', alignItems:'center' }}>
      <span style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
        <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--accent)', animation:'blink 1.6s ease-in-out infinite', display:'inline-block' }}/>
        ML MODEL ACTIVE
      </span>
      <span>AQI: {aqi}</span>
      <span>DATASETS: 800K+</span>
      <span>ALGORITHMS: 4</span>
      <span style={{ marginLeft:'auto' }}>{time}</span>
    </div>
  );
}

export function Loader({ done }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:9999, transition:'opacity .6s ease .3s', opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'all' }}>
      <div style={{ fontFamily:'var(--display)', fontSize:'5rem', color:'var(--accent)', animation:'logoAnim 1.2s ease-in-out infinite' }}>AQI</div>
      <div style={{ width:200, height:2, background:'rgba(255,255,255,.06)', marginTop:'1.5rem', overflow:'hidden' }}>
        <div style={{ height:'100%', background:'var(--accent)', animation:'loadBar 1.2s ease-out forwards' }}/>
      </div>
      <div style={{ fontFamily:'var(--mono)', fontSize:'.55rem', color:'var(--muted)', marginTop:'.8rem', letterSpacing:'.2em', textTransform:'uppercase' }}>Loading Dashboard</div>
      <style>{`@keyframes logoAnim{0%,100%{opacity:.35}50%{opacity:1}}@keyframes loadBar{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}

export const SLIDES_DATA = SLIDES;
