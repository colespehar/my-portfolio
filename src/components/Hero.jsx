import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaEnvelope, FaPlay } from "react-icons/fa";
import Lottie from "lottie-react";
import cycling from "../assets/animations/cycling.json";
import golf from "../assets/animations/golf.json";
import gym from "../assets/animations/gym.json";

/* typing hook unchanged */
function useTypeCount(totalChars, speed = 80, startDelay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 1;
        setCount((c) => (c < totalChars ? c + 1 : c));
        if (i >= totalChars) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [totalChars, speed, startDelay]);
  return count;
}

export default function Hero() {
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
          <Col md={7} className="mb-4 mb-md-0" data-aos="fade-up">
            <h1 className="display-5 fw-bold typing">
              {showBefore}
              <span className="text-primary">{showName}</span>
              {showAfter}
              <span className="cursor" aria-hidden="true" />
            </h1>

            <p className="lead opacity-75 mt-3">
              Full-stack developer skilled in React, Node.js, and Python,
              with hands-on experience designing RESTful APIs,
              AWS-based ETL pipelines, and real-time analytics dashboards.
              I focus on clean architecture, scalability, and turning
              complex datasets into actionable insights.
            </p>

            <div className="d-flex gap-2 mt-3">
              <Button variant="primary" href="#projects">
                <FaPlay className="me-2" />
                See Projects
              </Button>
              <Button variant="outline-secondary" href="#contact">
                Contact
              </Button>
            </div>

            <div className="d-flex gap-3 mt-4">
              <a
                className="text-decoration-none"
                href="https://github.com/colespehar"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={22} />
              </a>
              <a
                className="text-decoration-none"
                href="https://www.linkedin.com/in/colespehar/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                className="text-decoration-none"
                href="mailto:cole.spehar97@gmail.com"
                aria-label="Email"
              >
                <FaEnvelope size={22} />
              </a>
            </div>
          </Col>

          {/* Right Column — Animated Hobbies */}
          <Col md={5} data-aos="zoom-in">
            <div className="rounded-4 hero-stats-box text-center">
              <h2 className="h6 mb-4 text-light fw-semibold">Outside of Code</h2>

              <div className="d-flex justify-content-around align-items-center flex-wrap gap-4">
                <div className="d-flex flex-column align-items-center">
                  <Lottie animationData={cycling} loop autoplay className="hero-hobby-icon" />
                  <span className="hero-hobby-label text-light">Cycling</span>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <Lottie animationData={golf} loop autoplay className="hero-hobby-icon" />
                  <span className="hero-hobby-label text-light">Golf</span>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <Lottie animationData={gym} loop autoplay className="hero-hobby-icon" />
                  <span className="hero-hobby-label text-light">Gym</span>
                </div>
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