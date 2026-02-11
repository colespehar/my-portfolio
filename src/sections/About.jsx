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
            I build software that bridges the gap between
            sophisticated data and intuitive design. As a
            Full-Stack Developer with a background in
            enterprise finance and freelance innovation, I’ve
            spent my career scaling platforms like PrepPal and
            architecting secure, cloud-native solutions. I thrive
            at the intersection of TypeScript, React, and Node.js,
            focusing on clean code that scales.
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