import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { buildMailto, CONTACT_EMAIL as EMAIL } from "../utils/mailto.js";

// Formspree form IDs are public by design (they ship in the page HTML), but
// keeping this in an env var means staging and prod can point at different
// inboxes. See .env.example.
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID;
const ENDPOINT = FORM_ID ? `https://formspree.io/f/${FORM_ID}` : null;

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | handoff | error
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Let the browser surface its own validation UI first.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const values = Object.fromEntries(new FormData(form).entries());

    // No Formspree endpoint configured: hand off to the user's mail client.
    // Navigating to a mailto: URL works fine — it is mailto *form submission*
    // (method="post" action="mailto:") that browsers silently drop.
    if (!ENDPOINT) {
      const { href, tooLong } = buildMailto(values);
      if (tooLong) {
        setErrorMsg(
          "That message is a bit long to hand off to an email client. Please shorten it, or email me directly."
        );
        setStatus("error");
        return;
      }
      window.location.href = href;
      setStatus("handoff");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      // Formspree returns a JSON body describing what it rejected.
      const data = await res.json().catch(() => null);
      const detail = data?.errors?.map((err) => err.message).join(", ");
      setErrorMsg(detail || `Server responded ${res.status}.`);
      setStatus("error");
    } catch {
      // Network failure — the user's text is still in the form, so they can retry.
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const sending = status === "sending";

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
              <Form
                action={ENDPOINT ?? undefined}
                method={ENDPOINT ? "POST" : undefined}
                onSubmit={onSubmit}
                noValidate
              >
                {/* Spam trap: bots fill this, humans never see it. */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="d-none"
                  aria-hidden="true"
                />

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label htmlFor="contact-name" className="visually-hidden">Your Name</Form.Label>
                    <Form.Control id="contact-name" name="name" required placeholder="Your Name" autoComplete="name" disabled={sending} />
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="contact-email" className="visually-hidden">Email</Form.Label>
                    <Form.Control id="contact-email" name="email" required type="email" placeholder="Email" autoComplete="email" disabled={sending} />
                  </Col>
                  <Col xs={12}>
                    <Form.Label htmlFor="contact-message" className="visually-hidden">Message</Form.Label>
                    <Form.Control id="contact-message" name="message" as="textarea" rows={4} required placeholder="Message..." disabled={sending} />
                  </Col>

                  <Col xs={12}>
                    {/* aria-live so the outcome is announced, not just shown. */}
                    <div role="status" aria-live="polite">
                      {status === "sent" && (
                        <Alert variant="success" className="mb-0 py-2">
                          Thanks — your message is on its way. I’ll get back to you soon.
                        </Alert>
                      )}
                      {status === "handoff" && (
                        <Alert variant="info" className="mb-0 py-2">
                          Your email app should have opened with the message ready to send.
                          If nothing happened,{" "}
                          <Alert.Link href={`mailto:${EMAIL}`}>email me directly</Alert.Link>.
                        </Alert>
                      )}
                      {status === "error" && (
                        <Alert variant="danger" className="mb-0 py-2">
                          Couldn’t send your message. {errorMsg}{" "}
                          <Alert.Link href={`mailto:${EMAIL}`}>Email me directly</Alert.Link> instead.
                        </Alert>
                      )}
                    </div>
                  </Col>

                  <Col xs={12} className="d-flex justify-content-end">
                    <Button type="submit" variant="primary" disabled={sending}>
                      {sending ? "Sending…" : "Send"}
                    </Button>
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
