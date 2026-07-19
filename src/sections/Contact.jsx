import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Contact() {
  return (
    <section id="contact" className="py-4 bg-body-tertiary">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={6} data-aos="fade-right">
            <h2 className="fw-bold mt-3 mb-3">Let's Connect!</h2>
            <p className="mb-0">Open to opportunities, freelance work, and interesting problems. Reach out and say hello!</p>
          </Col>
          <Col lg={6} data-aos="fade-left">
            <div className="contact-box p-4 rounded-4">
              <Form action="mailto:cole.spehar97@gmail.com" method="post" encType="text/plain">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label htmlFor="contact-name" className="visually-hidden">Your Name</Form.Label>
                    <Form.Control id="contact-name" name="name" required placeholder="Your Name" autoComplete="name" />
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="contact-email" className="visually-hidden">Email</Form.Label>
                    <Form.Control id="contact-email" name="email" required type="email" placeholder="Email" autoComplete="email" />
                  </Col>
                  <Col xs={12}>
                    <Form.Label htmlFor="contact-message" className="visually-hidden">Message</Form.Label>
                    <Form.Control id="contact-message" name="message" as="textarea" rows={4} required placeholder="Message..." />
                  </Col>
                  <Col xs={12} className="d-flex justify-content-end">
                    <Button type="submit" variant="primary">Send</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
