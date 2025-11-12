import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <section id="about" className="py-5">
      <Container>
        {/* About Section */}
        <div data-aos="fade-up">
          <h2 className="fw-bold mb-4">About</h2>
          <p className="lead mb-4">
            I’m a <strong>full stack developer</strong> passionate about turning
            data and design into seamless digital experiences. I specialize in
            building web applications that are <strong>fast, scalable, and intuitive</strong> — blending
            React, Node.js, and AWS technologies to deliver reliable,
            production-ready systems. My focus is on <strong>clean architecture</strong>,
            measurable performance, and continuous improvement through
            analytics and experimentation.
          </p>
        </div>

        {/* Toolkit & Skills */}
        <div data-aos="fade-up" className="toolkit-section">
          <h3 className="fw-bold mb-4 text-primary">Toolkit & Skills</h3>

          <Row className="gy-4 gx-md-5">
            {/* Column 1 */}
            <Col md={6}>
              <h5 className="fw-semibold text-primary mb-2">
                Languages & Frameworks
              </h5>
              <p className="text-body-secondary mb-4">
                Python, JavaScript, React, TypeScript, Next.js, Node.js, C#, C, C++, Java, Flask
              </p>

              <h5 className="fw-semibold text-primary mb-2">
                Cloud & Data Infrastructure
              </h5>
              <p className="text-body-secondary mb-4">
                AWS Glue, Lambda, S3, CloudWatch, Athena, Redshift, SQL /
                NoSQL / MySQL, ETL Pipelines, Data Visualization
              </p>
            </Col>

            {/* Column 2 */}
            <Col md={6}>
              <h5 className="fw-semibold text-primary mb-2">
                Development Tools
              </h5>
              <p className="text-body-secondary mb-4">
                Git / GitHub, Docker, CI/CD Automation, Postman,
                Figma, Firebase, VS Code
              </p>

              <h5 className="fw-semibold text-primary mb-2">
                Front End & UI Design
              </h5>
              <p className="text-body-secondary mb-4">
                AODA, HTML, Bootstrap, Tailwind CSS, Adobe CC Suite, Responsive Design,
                Accessibility Optimization, Performance Tuning
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}