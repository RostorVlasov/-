/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Marks } from './components/Marks';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Colors } from './components/Colors';
import { Perks } from './components/Perks';
import { Tech } from './components/Tech';
import { Contact } from './components/Contact';
import { PrivacyPolicy } from './components/PrivacyPolicy';

/**
 * Main landing view integrating smooth scroll animations,
 * intersection observers for reveals, and route-based anchor navigation.
 */
const MainLanding: React.FC = () => {
  const location = useLocation();

  // Handle route change scrolling to sections
  useEffect(() => {
    const path = location.pathname.replace(/^\//, '');
    if (path) {
      const el = document.getElementById(path);
      if (el) {
        // slight timeout to allow layout to settle
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return () => clearTimeout(timer);
      }
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Observer for in-view animations
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Marks />
      <Hero />
      <Intro />
      <Colors />
      <Perks />
      <Tech />
      <Contact />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/colors" element={<MainLanding />} />
        <Route path="/palette" element={<MainLanding />} />
        <Route path="/tech" element={<MainLanding />} />
        <Route path="/specs" element={<MainLanding />} />
        <Route path="/perks" element={<MainLanding />} />
        <Route path="/contact" element={<MainLanding />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<MainLanding />} />
      </Routes>
    </BrowserRouter>
  );
}
