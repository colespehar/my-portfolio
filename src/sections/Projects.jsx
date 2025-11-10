// src/sections/Projects.jsx
import React, { useMemo, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { PROJECTS, ALL_TAG } from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

export default function Projects() {
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const tags = useMemo(
    () => [ALL_TAG, ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))],
    []
  );

  const filtered = useMemo(() => {
    return PROJECTS.filter(
      (p) =>
        (activeTag === ALL_TAG || p.tags.includes(activeTag)) &&
        (search.trim() === "" ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.blurb.toLowerCase().includes(search.toLowerCase()))
    );
  }, [activeTag, search]);

  // Limit Work Projects to 4, Personal to 3
  const workProjects = filtered.filter((p) => p.category === "work").slice(0, 4);
  const personalProjects = filtered
    .filter((p) => p.category === "personal")
    .slice(0, 3);

  return (
    <section id="projects" className="py-5">
      <Container>
        {/* Header + Filter */}
        <div
          className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4"
          data-aos="fade-up"
        >
          <div>
            <h2 className="fw-bold mb-1">Projects</h2>
            <p className="text-body-secondary mb-0">
              Filter by tag or search titles/descriptions.
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {tags.map((t) => (
              <Button
                key={t}
                size="sm"
                variant={t === activeTag ? "primary" : "outline-secondary"}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <Form className="mb-5" data-aos="fade-up">
          <Form.Control
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
          />
        </Form>

        {/* Personal Projects */}
        <h3 className="fw-bold mb-3">Personal Projects</h3>
        <Row xs={1} sm={2} md={2} lg={3} xl={3} className="g-4">
          {personalProjects.map((p, idx) => (
            <Col key={p.id} data-aos="fade-up" data-aos-delay={idx * 50}>
              <ProjectCard project={p} onOpen={setSelected} />
            </Col>
          ))}
        </Row>

        {/* Add spacing between personal and work projects */}
        <div className="my-5" /> {/* <-- clean spacer */}

        {/* Work Projects */}
        <h3 className="fw-bold mb-3">Work Projects</h3>
        <Row xs={1} sm={2} md={2} lg={3} xl={3} className="g-4 mb-5">
          {workProjects.map((p, idx) => (
            <Col key={p.id} data-aos="fade-up" data-aos-delay={idx * 50}>
              <ProjectCard project={p} onOpen={setSelected} />
            </Col>
          ))}
        </Row>
      </Container>

      <ProjectModal project={selected} onHide={() => setSelected(null)} />
    </section>
  );
}