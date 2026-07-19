import React, { useEffect, useState, Suspense } from "react";
import AOS from "aos";
import { Container } from "react-bootstrap";
import SiteNavbar from "./components/SiteNavbar.jsx";
import Hero from "./components/Hero.jsx";
import ScrollTop from "./components/ScrollTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const About = React.lazy(() => import("./sections/About.jsx"));
const Projects = React.lazy(() => import("./sections/Projects.jsx"));
const Contact = React.lazy(() => import("./sections/Contact.jsx"));

export default function App() {
  const [theme] = useState(() => localStorage.getItem("theme") || "dark");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SiteNavbar />

      <main>
        <Hero />

        <ErrorBoundary>
          <Suspense fallback={null}>
            <About />
            <Projects />
            <Contact />
          </Suspense>
        </ErrorBoundary>
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
