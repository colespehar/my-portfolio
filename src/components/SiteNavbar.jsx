import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function SiteNavbar() {
  const [active, setActive] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Re-queried on every pass: About/Projects/Contact are React.lazy and are
    // not in the DOM yet when this effect first runs.
    const getSections = () =>
      ["hero", "about", "projects", "contact"]
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((s) => s.el);

    const getNavH = () => (navRef.current?.offsetHeight ?? 0);

    const computeActive = () => {
      const sections = getSections();
      if (!sections.length) return;

      const navH = getNavH();
      const marker = window.scrollY + navH + 16;

      if (window.scrollY <= 4) {
        setActive(null);
        return;
      }

      let current = null;
      for (const { id, el } of sections) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (marker >= top && marker < bottom) {
          current = id === "hero" ? null : id;
          break;
        }
      }

      if (!current) {
        const before = sections.filter((s) => s.el.offsetTop <= marker).pop();
        if (before) current = before.id === "hero" ? null : before.id;
      }

      const doc = document.documentElement;
      const atBottom =
        Math.ceil(window.scrollY + window.innerHeight) >= Math.floor(doc.scrollHeight - 1);
      if (atBottom) current = sections[sections.length - 1].id;

      setActive(current);
    };

    // computeActive reads layout (offsetTop/offsetHeight/scrollHeight), so
    // coalesce bursts of scroll events down to one measurement per frame.
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        computeActive();
      });
    };

    computeActive();
    const onHash = () => setTimeout(computeActive, 0);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", onHash);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const gotoTop = (e) => {
    e.preventDefault();
    setActive(null);
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", "#hero");
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-body shadow-sm"
      data-aos="fade-down"
      ref={navRef}
    >
      <Container>
        <Navbar.Brand href="#hero" onClick={gotoTop} className="fw-bold">
          cole<span className="text-primary">.dev</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link
              href="#about"
              className="nav-link-purple"
              active={active === "about"}
            >
              About
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className="nav-link-purple"
              active={active === "projects"}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className="nav-link-purple"
              active={active === "contact"}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}