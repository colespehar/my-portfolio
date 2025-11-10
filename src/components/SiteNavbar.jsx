import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaSun, FaMoon } from "react-icons/fa";

export default function SiteNavbar({ theme, setTheme }) {
  const [active, setActive] = useState(null); // null = clear highlight at top
  const navRef = useRef(null);

  useEffect(() => {
    const sections = ["hero", "about", "projects", "contact"]
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((s) => s.el);

    const getNavH = () => (navRef.current?.offsetHeight ?? 0);

    const computeActive = () => {
      const navH = getNavH();
      // absolute Y position of a marker line just below the navbar
      const marker = window.scrollY + navH + 16;

      // very top → clear highlight
      if (window.scrollY <= 4) {
        setActive(null);
        return;
      }

      // find section spanning the marker
      let current = null;
      for (const { id, el } of sections) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (marker >= top && marker < bottom) {
          current = id === "hero" ? null : id;
          break;
        }
      }

      // if none matched, pick the last section above the marker
      if (!current) {
        const before = sections.filter((s) => s.el.offsetTop <= marker).pop();
        if (before) current = before.id === "hero" ? null : before.id;
      }

      // bottom-of-page fallback → force last section active
      const doc = document.documentElement;
      const atBottom =
        Math.ceil(window.scrollY + window.innerHeight) >= Math.floor(doc.scrollHeight - 1);
      if (atBottom) {
        current = sections[sections.length - 1].id; // "contact"
      }

      setActive(current);
    };

    // initial + scroll/resize/hash
    computeActive();
    const onScroll = () => computeActive();
    const onResize = () => computeActive();
    const onHash = () => setTimeout(computeActive, 0);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  // Smooth scroll + clear highlight when clicking the logo
  const gotoTop = (e) => {
    e.preventDefault();
    setActive(null);
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    // keep URL hash in sync without jumping
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

            <Button
              variant="outline-secondary"
              size="sm"
              className="ms-lg-2 theme-toggle-purple"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <>
                  <FaSun className="me-2" />
                  Light
                </>
              ) : (
                <>
                  <FaMoon className="me-2" />
                  Dark
                </>
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}