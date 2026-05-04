import React, { useEffect, useState } from 'react';
import './styles/global.css';
import 'leaflet/dist/leaflet.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/Navbar";

import Slide1Hero       from './components/Hero';
import Slide2Problem    from './components/2Problem';
import SlidePrediction from './components/Prediction';
import Slide4Maps       from './components/3Map';
import Slide5Algorithms from './components/4Algorithms';
import Slide6CTA        from './components/5CTA';

import {
  NavDots, SlideLabel, SlideCounter, StatusBar, Loader, SLIDES_DATA
} from './components/NavDots';

const SLIDE_IDS = SLIDES_DATA.map(s => s.id);

export default function App() {

  const location = useLocation(); // 🔥 route detection

  const [loaderDone, setLoaderDone] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // ✅ Loader
  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // ✅ Observer ONLY on homepage
  useEffect(() => {
    if (location.pathname !== "/") return;

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
  }, [location.pathname]);

  // ✅ Scroll
  const goToSlide = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ Protected Route
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
  };

  // ✅ Navbar visibility logic (FIXED)
  const hideNavbarRoutes = ["/login", "/signup"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <Loader done={loaderDone} />

      {/* ✅ Navbar controlled properly */}
      {showNavbar && <Navbar />}

      <Routes>

        {/* HOME */}
        <Route path="/" element={
          <>
            <NavDots active={activeSlide} onDotClick={goToSlide} />
            <SlideLabel label={SLIDES_DATA[activeSlide]?.label || ''} />
            <SlideCounter current={activeSlide} />
            <StatusBar />

            <main>
              <Slide1Hero />
              <Slide2Problem />
              <Slide4Maps />
              <Slide5Algorithms />
              <Slide6CTA />
            </main>
          </>
        } />

        {/* 🔥 PROTECTED PREDICTION PAGE */}
        <Route
          path="/prediction"
          element={
            <ProtectedRoute>
              <div style={{ paddingTop: "80px" }}>
                <SlidePrediction />
              </div>
            </ProtectedRoute>
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </>
  );
}