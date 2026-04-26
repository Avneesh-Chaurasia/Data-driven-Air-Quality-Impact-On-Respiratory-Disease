// src/components/Slide3Maps.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// 🔑 PASTE YOUR OpenWeatherMap API Key here:
const OWM_KEY = import.meta.env.VITE_OWM_KEY;
const AQICN_TOKEN = import.meta.env.VITE_AQICN_TOKEN;

const AQI_LABELS = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
const AQI_COLORS = ['', '#00e400', '#ffff00', '#ff7e00', '#ff0000', '#7e0023'];
const getCategory = (aqi) => {
  if (aqi <= 50) return 1;
  if (aqi <= 100) return 2;
  if (aqi <= 150) return 3;
  if (aqi <= 200) return 4;
  return 5;
};

export default function Slide3Maps() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.4 });
  const mapAQIRef     = useRef(null);
  const mapClimateRef = useRef(null);
  const leafletAQI    = useRef(null);
  const leafletClimate= useRef(null);
  const initialized   = useRef(false);

  const [aqiData,     setAqiData]     = useState({ badge: 'AQI: —', pm25: '—', pm10: '—', no2: '—', o3: '—' });
  const [weatherData, setWeatherData] = useState({ temp: '—', feels: '—', humid: '—', wind: '—', cond: '—' });
  const [location,    setLocation]    = useState('📍 Detecting location…');
  const [showNotice,  setShowNotice]  = useState(false);

  useEffect(() => {
    if (!inView || initialized.current) return;
    initialized.current = true;

    // Dynamically import Leaflet (avoids SSR issues)
    import('leaflet').then(L => {
      const initMaps = (lat, lon) => {
        setLocation(`📍 ${lat.toFixed(3)}, ${lon.toFixed(3)}`);

        // AQI Map
        leafletAQI.current = L.map(mapAQIRef.current, { zoomControl: true, attributionControl: false })
          .setView([lat, lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
          .addTo(leafletAQI.current);

        // Climate Map
        leafletClimate.current = L.map(mapClimateRef.current, { zoomControl: true, attributionControl: false })
          .setView([lat, lon], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
          .addTo(leafletClimate.current);

        if (OWM_KEY && OWM_KEY !== 'YOUR_OPENWEATHERMAP_API_KEY') {
          fetchAQI(L, lat, lon);
          fetchWeather(L, lat, lon);
        } else {
          setShowNotice(true);
          loadDemoData(L, lat, lon);
        }
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          p => initMaps(p.coords.latitude, p.coords.longitude),
          ()  => initMaps(19.076, 72.877)
        );
      } else {
        initMaps(19.076, 72.877);
      }
    });
  }, [inView]);

  const fetchAQI = async (L, lat, lon) => {
    try {
      const res = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${AQICN_TOKEN}`);
      const d = await res.json();

      if (d.status !== "ok") throw new Error("Invalid AQI response");

      const data = d.data;
      const aqi = data.aqi;
      const iaqi = data.iaqi || {};

      const pm25 = iaqi.pm25?.v ?? '—';
      const pm10 = iaqi.pm10?.v ?? '—';
      const no2  = iaqi.no2?.v  ?? '—';
      const o3   = iaqi.o3?.v   ?? '—';

      const col = AQI_COLORS[getCategory(aqi)] || '#999';

      setAqiData({
        badge: `AQI: ${aqi}`,
        badgeColor: col,
        pm25: `${pm25} µg/m³`,
        pm10: `${pm10} µg/m³`,
        no2:  `${no2} µg/m³`,
        o3:   `${o3} µg/m³`,
      });

      const icon = L.divIcon({
        className: '',
        html: `<div style="background:${col};width:18px;height:18px;border-radius:50%;border:2px solid #fff;"></div>`
      });

      L.marker([lat, lon], { icon })
        .addTo(leafletAQI.current)
        .bindPopup(`<b>AQI: ${aqi}</b><br>PM2.5: ${pm25}`);

    } catch (e) {
      console.error('AQI error', e);
    }
  };

  const fetchWeather = async (L, lat, lon) => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWM_KEY}&units=metric`);
      const d = await res.json();
      setWeatherData({
        temp:  `${d.main.temp.toFixed(1)}°C`,
        feels: `${d.main.feels_like.toFixed(1)}°C`,
        humid: `${d.main.humidity}%`,
        wind:  `${d.wind.speed} m/s`,
        cond:  d.weather[0].description.toUpperCase(),
      });
      const tempCol = d.main.temp > 35 ? '#ff4d4d' : d.main.temp > 25 ? '#f5a623' : '#00f5a0';
      L.circle([lat, lon], { radius: 12000, color: tempCol, fillColor: tempCol, fillOpacity: .1, weight: 1 }).addTo(leafletClimate.current);
      const icon = L.divIcon({ className: '', html: `<div style="background:${tempCol};color:#000;font-family:monospace;font-size:11px;padding:3px 6px;border-radius:2px;font-weight:700;">${d.main.temp.toFixed(1)}°C</div>` });
      L.marker([lat, lon], { icon }).addTo(leafletClimate.current);
      L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OWM_KEY}`, { opacity: .4, maxZoom: 18 }).addTo(leafletClimate.current);
    } catch (e) { console.error('Weather error', e); }
  };

  const loadDemoData = (L, lat, lon) => {
    const col = '#f5a623';
    L.circle([lat, lon], { radius: 8000, color: col, fillColor: col, fillOpacity: .12, weight: 1 }).addTo(leafletAQI.current);
    const i1 = L.divIcon({ className: '', html: `<div style="background:${col};width:18px;height:18px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 10px ${col}"></div>` });
    L.marker([lat, lon], { icon: i1 }).addTo(leafletAQI.current).bindPopup('Demo mode — add API key for live data');
    setAqiData({ badge: 'AQI: DEMO (MODERATE)', badgeColor: col, pm25: '187 µg/m³', pm10: '143 µg/m³', no2: '112 µg/m³', o3: '94 µg/m³' });

    L.circle([lat, lon], { radius: 12000, color: col, fillColor: col, fillOpacity: .1, weight: 1 }).addTo(leafletClimate.current);
    const i2 = L.divIcon({ className: '', html: `<div style="background:${col};color:#000;font-family:monospace;font-size:11px;padding:3px 6px;border-radius:2px;font-weight:700;">32.4°C</div>` });
    L.marker([lat, lon], { icon: i2 }).addTo(leafletClimate.current);
    setWeatherData({ temp: '32.4°C', feels: '36.1°C', humid: '78%', wind: '4.2 m/s', cond: 'HAZE' });
  };

  const StatChip = ({ label, value, color }) => (
    <div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', color: 'var(--muted)' }}>{label} </span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color }}>{value}</span>
    </div>
  );

  return (
    <section id="slide-4" ref={sectionRef} style={styles.slide}>
      <div style={styles.grid} />
      <div style={{ ...styles.inner, height: '88vh', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={styles.eyebrow}>◈ Slide 04 / Geospatial</div>
            <h2 style={{ ...styles.displayTitle, fontSize: 'clamp(2.5rem,4.5vw,5rem)' }}>
              LIVE <span style={{ color: 'var(--accent4)' }}>MAP</span> INTELLIGENCE
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={styles.pill}><span style={styles.dot} />REAL-TIME</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.58rem', color: 'var(--muted2)' }}>{location}</div>
          </div>
        </div>

        {/* Two Maps */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', flex: 1, minHeight: 0 }}>

          {/* AQI Map */}
          <div style={styles.mapCard}>
            <div style={styles.mapPanelAccent} />
            <div style={styles.mapHeader}>
              <span style={{ ...styles.eyebrow, marginBottom: 0, color: 'var(--accent)' }}>◈ Current AQI Layer</span>
              <span style={{ ...styles.badge, borderColor: aqiData.badgeColor || 'var(--accent)', color: aqiData.badgeColor || 'var(--accent)' }}>
                {aqiData.badge}
              </span>
            </div>
            <div ref={mapAQIRef} style={{ flex: 1, minHeight: 0 }} />
            <div style={styles.mapFooter}>
              <StatChip label="PM2.5" value={aqiData.pm25} color="var(--accent2)" />
              <StatChip label="PM10"  value={aqiData.pm10} color="var(--accent3)" />
              <StatChip label="NO₂"   value={aqiData.no2}  color="var(--accent4)" />
              <StatChip label="O₃"    value={aqiData.o3}   color="var(--accent)"  />
            </div>
          </div>

          {/* Climate Map */}
          <div style={styles.mapCard}>
            <div style={{ ...styles.mapPanelAccent, background: 'linear-gradient(90deg,var(--accent3),transparent)' }} />
            <div style={styles.mapHeader}>
              <span style={{ ...styles.eyebrow, marginBottom: 0, color: 'var(--accent3)' }}>◈ Climate & Temperature</span>
              <span style={{ ...styles.badge, borderColor: 'var(--accent3)', color: 'var(--accent3)' }}>
                {weatherData.temp}
              </span>
            </div>
            <div ref={mapClimateRef} style={{ flex: 1, minHeight: 0 }} />
            <div style={styles.mapFooter}>
              <StatChip label="FEELS" value={weatherData.feels} color="var(--accent3)" />
              <StatChip label="HUMID" value={weatherData.humid} color="var(--accent4)" />
              <StatChip label="WIND"  value={weatherData.wind}  color="var(--accent)"  />
              <StatChip label="COND"  value={weatherData.cond}  color="var(--text)"    />
            </div>
          </div>
        </div>

        {showNotice && (
          <div style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', color: 'var(--muted)', textAlign: 'center', flexShrink: 0 }}>
            ⚠ Add your OpenWeatherMap API key in <code>Slide2Maps.jsx</code> (line 6) to enable live data.
          </div>
        )}
      </div>

      <div style={styles.scrollHint}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        SCROLL
      </div>

      <style>{`
        @keyframes hintBob{ 0%,100%{opacity:.35;transform:translateX(-50%) translateY(0)} 50%{opacity:.9;transform:translateX(-50%) translateY(7px)} }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.12}}
      `}</style>
    </section>
  );
}

const styles = {
  slide: {
    height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always',
    position: 'relative', display: 'flex', alignItems: 'center',
    justifyContent: 'center', overflow: 'hidden',
    background: 'radial-gradient(ellipse 60% 50% at 85% 20%, #0a1a2a 0%, #060d0f 65%)',
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(rgba(0,245,160,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,.08) 1px,transparent 1px)',
    backgroundSize: '64px 64px', pointerEvents: 'none', zIndex: 0,
  },
  inner: { position: 'relative', zIndex: 1, width: 'min(1240px,94vw)' },
  eyebrow: { fontFamily: 'var(--mono)', fontSize: '.58rem', color: 'var(--accent)', letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: '.9rem' },
  displayTitle: { fontFamily: 'var(--display)', lineHeight: .9, color: 'var(--text)' },
  pill: { display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontFamily: 'var(--mono)', fontSize: '.52rem', color: 'var(--accent)', letterSpacing: '.1em', textTransform: 'uppercase', border: '1px solid rgba(0,245,160,.25)', padding: '.3rem .7rem' },
  dot: { width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'blink 1.6s ease-in-out infinite', display: 'inline-block' },
  mapCard: { border: '1px solid rgba(0,245,160,.13)', background: 'rgba(0,245,160,.02)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' },
  mapPanelAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,var(--accent),transparent)', zIndex: 2 },
  mapHeader: { padding: '.8rem 1rem', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
  badge: { fontFamily: 'var(--mono)', fontSize: '.62rem', padding: '.25rem .6rem', border: '1px solid', letterSpacing: '.08em' },
  mapFooter: { padding: '.6rem 1rem', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', gap: '1.5rem', flexShrink: 0 },
  scrollHint: { position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem', fontFamily: 'var(--mono)', fontSize: '.48rem', color: 'var(--muted)', letterSpacing: '.15em', textTransform: 'uppercase', animation: 'hintBob 2.2s ease-in-out infinite' },
};
