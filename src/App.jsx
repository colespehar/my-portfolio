import React, { useEffect, useRef, useState, Suspense } from "react";
import AOS from "aos";
import { Container } from "react-bootstrap";
import SiteNavbar from "./components/SiteNavbar.jsx";
import Hero from "./components/Hero.jsx";
import ScrollTop from "./components/ScrollTop.jsx";
import { animateCounter } from "./utils/anim.js";

const About = React.lazy(() => import("./sections/About.jsx"));
const Projects = React.lazy(() => import("./sections/Projects.jsx"));
const Contact = React.lazy(() => import("./sections/Contact.jsx"));

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [showTop, setShowTop] = useState(false);
  const countersRef = useRef([]);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Kick off number counters once visible (Hero uses countersRef)
  useEffect(() => {
    const els = countersRef.current.filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const end = parseInt(el.getAttribute("data-end") || "0", 10);
          animateCounter(el, end, 900);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteNavbar theme={theme} setTheme={setTheme} />

      <main>
        <Hero countersRef={countersRef} />

        <Suspense fallback={null}>
          <About />
          <Projects />
          <Contact />
        </Suspense>
      </main>

      <footer className="py-4">
        <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small className="text-body-secondary">© {new Date().getFullYear()} Cole Spehar</small>
        </Container>
      </footer>

      {/* Only one Back to Top button, scroll-triggered */}
      <ScrollTop visible={showTop} />
    </>
  );
}
