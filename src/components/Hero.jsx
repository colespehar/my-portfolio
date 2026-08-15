import React, { useEffect, useState, Suspense } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaEnvelope, FaPlay, FaPhone } from "react-icons/fa";
import { HOBBIES } from "./hobbies.js";

const HobbyAnimations = React.lazy(() => import("./HobbyAnimations.jsx"));

// Same dimensions as the real icons (.hero-hobby-icon) so the swap is shift-free.
function HobbyPlaceholder() {
  return HOBBIES.map(({ key, label }) => (
    <div key={key} className="d-flex flex-column align-items-center">
      <div className="hero-hobby-icon" aria-hidden="true" />
      <span className="hero-hobby-label text-light">{label}</span>
    </div>
  ));
}

// The Lottie player is ~83KB gzip. Rendering it on mount fires its dynamic
// import immediately, so it competes with the LCP hero image for bandwidth.
// Wait for the browser to go idle before mounting — the decorative animations
// can arrive a beat late, the shift-free placeholder holds their place.
function useIdle() {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (typeof window.requestIdleCallback !== "function") {
      const t = setTimeout(() => setIdle(true), 200); // Safari < 17 fallback
      return () => clearTimeout(t);
    }
    const id = window.requestIdleCallback(() => setIdle(true), { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }, []);
  return idle;
}

/* typing hook unchanged */
function useTypeCount(totalChars, speed = 80, startDelay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let i = 0;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setCount((c) => (c < totalChars ? c + 1 : c));
        if (i >= totalChars) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [totalChars, speed, startDelay]);
  return count;
}

export default function Hero() {
  const showAnimations = useIdle();
  const before = "Hi, I'm ";
  const name = "Cole";
  const after =
    " — I design and build scalable software for the web and cloud.";
  const total = before.length + name.length + after.length;
  const typed = useTypeCount(total, 50);

  const showBefore = before.slice(0, Math.min(typed, before.length));
  const rem1 = Math.max(0, typed - before.length);
  const showName = name.slice(0, Math.min(rem1, name.length));
  const rem2 = Math.max(0, rem1 - name.length);
  const showAfter = after.slice(0, Math.min(rem2, after.length));

  return (
    <section id="hero" className="py-5 position-relative">
      {/* Typing effect + cursor */}
      <style>{`
        #hero .typing { display:inline-block; white-space:pre-wrap; }
        #hero .cursor {
          display:inline-block; width:2px; height:1em;
          background: var(--custom-accent);
          margin-left: 3px; vertical-align: baseline;
          animation: hero-blink 1s steps(1) infinite;
        }
        @keyframes hero-blink { 50% { opacity: 0 } }
      `}</style>

      <Container>
        <Row className="align-items-center">
          {/* Left Column */}
          {/* No data-aos here: aos.css hides [data-aos] until AOS.init runs in
              JS, which would leave the headline — the main above-the-fold
              content — invisible until the bundle loads. */}
          <Col md={7} className="mb-4 mb-md-0">
            <h1 className="display-5 fw-bold typing">
              {showBefore}
              <span className="name-glow">{showName}</span>
              {showAfter}
              <span className="cursor" aria-hidden="true" />
            </h1>

            <p className="lead opacity-75 mb-4 mt-4">
              Full-Stack Engineer based in Toronto, specializing in React,
              Node.js, and AWS Cloud Architecture. I have a proven track record of
              transforming complex datasets into actionable insights through
              scalable web applications and real-time analytics. Beyond the IDE, I’m a
              dedicated cyclist and golfer who believes the discipline of
              sport translates directly into the precision of my code.
            </p>

            <div className="d-flex gap-2 mt-4">
              <Button variant="primary" href="#projects">
                <FaPlay className="me-2" />
                See Projects
              </Button>
              <Button variant="outline-secondary" href="#contact">
                Contact
              </Button>
            </div>
            <div className="d-flex gap-3 mt-4 socials">
              <a href="https://github.com/colespehar" target="_blank" rel="noreferrer">
                <FaGithub size={22} />
              </a>
              <a href="https://www.linkedin.com/in/colespehar/" target="_blank" rel="noreferrer">
                <FaLinkedin size={22} />
              </a>
              <a href="mailto:cole.spehar97@gmail.com">
                <FaEnvelope size={22} />
              </a>
              <a href="tel:+12262201109">
                <FaPhone size={22} />
              </a>
            </div>
          </Col>

          {/* Right Column — Animated Hobbies (also above the fold, so no AOS) */}
          <Col md={5}>
            <div className="rounded-4 hero-stats-box text-center">
              <h2 className="h6 mb-4 text-light fw-semibold">Outside of Code</h2>

              <div className="d-flex justify-content-around align-items-center flex-wrap gap-4">
                {showAnimations ? (
                  <Suspense fallback={<HobbyPlaceholder />}>
                    <HobbyAnimations />
                  </Suspense>
                ) : (
                  <HobbyPlaceholder />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Divider */}
      <div className="section-divider position-absolute bottom-0 start-0 end-0" />
    </section>
  );
}