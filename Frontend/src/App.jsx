import React, { useEffect, useState } from 'react';
import './styles/global.css';
import 'leaflet/dist/leaflet.css';
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import Slide1Hero         from './components/Hero';
import Slide2Problem      from './components/2Problem';
import Slide3Prediction   from './components/3Prediction';
import Slide4Maps         from './components/4Map';
import Slide5Algorithms   from './components/5Algorithms';
import Slide6CTA          from './components/6CTA';
import {
  NavDots, SlideLabel, SlideCounter, StatusBar, Loader, SLIDES_DATA
} from './components/NavDots';

const SLIDE_IDS = SLIDES_DATA.map(s => s.id);

export default function App() {
  const [loaderDone,   setLoaderDone]   = useState(false);
  const [activeSlide,  setActiveSlide]  = useState(0);

  // Dismiss loader
  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // IntersectionObserver for active slide tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = SLIDE_IDS.indexOf(e.target.id);
            if (idx >= 0) setActiveSlide(idx);
          }
        });
      },
      { threshold: 0.55 }
    );
    SLIDE_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goToSlide = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      
      <Loader done={loaderDone} />

      <Routes>

        {/* HOME PAGE (with dots + UI) */}
        <Route path="/" element={
          <>
            <Navbar />
            <NavDots active={activeSlide} onDotClick={goToSlide} />
            <SlideLabel label={SLIDES_DATA[activeSlide]?.label || ''} />
            <SlideCounter current={activeSlide} />
            <StatusBar />

            <main>
              <Slide1Hero />
              <Slide2Problem />
              <Slide3Prediction />
              <Slide4Maps />
              <Slide5Algorithms />
              <Slide6CTA />
            </main>
          </>
        } />

        {/* LOGIN PAGE (clean UI) */}
        <Route path="/login" element={<Login />} />

        {/* SIGNUP PAGE (clean UI) */}
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </>
  );
}
