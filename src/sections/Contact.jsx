import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Contact() {
  return (
    <section id="contact" className="py-5 bg-body-tertiary">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={6} data-aos="fade-right">
            <h2 className="fw-bold mb-3">Let's Connect!</h2>
            <p className="mb-0">Open to opportunities, freelance work, and interesting problems. Reach out and say hello!</p>
          </Col>
          <Col lg={6} data-aos="fade-left">
            <div className="p-4 border rounded-4 shadow-sm">
              <Form action="mailto:cole.spehar97@gmail.com" method="post" encType="text/plain">
                <Row className="g-3">
                  <Col md={6}><Form.Control required placeholder="Your name" /></Col>
                  <Col md={6}><Form.Control required type="email" placeholder="Email" /></Col>
                  <Col xs={12}><Form.Control as="textarea" rows={4} placeholder="Message" /></Col>
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
