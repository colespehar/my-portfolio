import React, { useRef, useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";

export default function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const isWork = project.category === "work";

  const hasVideo = project.media?.type === "video" && project.media.preview;
  const hasGif = project.media?.type === "gif" && project.media.preview;

  const onEnter = () => {
    setHovered(true);
    if (hasVideo && videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } catch {
        // Ignore autoplay restriction errors
      }
    }
  };

  const onLeave = () => {
    setHovered(false);
    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // ✅ reset to avoid frozen frame
    }
  };

  return (
    <Card
      className="h-100 border-0 shadow-sm project-card"
      data-category={project.category}
      onClick={() => onOpen(project)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="button"
    >
      <div className="ratio ratio-16x9 overflow-hidden rounded-top media-wrap position-relative">
        {/* Base static image */}
        <img
          src={project.media?.poster || project.img}
          alt={project.title}
          className={`w-100 h-100 object-fit-cover position-absolute top-0 start-0 transition-opacity ${hovered ? "opacity-0" : "opacity-100"
            }`}
          loading="lazy"
        />

        {/* Hover video */}
        {hasVideo && (
          <video
            ref={videoRef}
            className={`w-100 h-100 object-fit-cover position-absolute top-0 start-0 transition-opacity ${hovered ? "opacity-100" : "opacity-0"
              }`}
            src={project.media.preview}
            poster={project.media.poster || project.img}
            muted
            playsInline
            loop
            preload="none"
            aria-hidden={!hovered}
          />
        )}

        {/* Hover GIF */}
        {hasGif && (
          <img
            src={project.media.preview}
            alt=""
            className={`w-100 h-100 object-fit-cover position-absolute top-0 start-0 transition-opacity ${hovered ? "opacity-100" : "opacity-0"
              }`}
            loading="lazy"
            aria-hidden={!hovered}
          />
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex align-items-start justify-content-between gap-2">
          <span>{project.title}</span>
          <span className="d-flex gap-1 flex-wrap justify-content-end">
            {project.tags.slice(0, 3).map((tg) => (
              <Badge key={tg} bg="secondary" pill>
                {tg}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge bg="secondary" pill className="opacity-75">
                +{project.tags.length - 3}
              </Badge>
            )}
          </span>
        </Card.Title>

        <div className="blurb-wrap clamped">
          <p className="project-blurb mb-2">{project.blurb}</p>
          <span className="blurb-fade" aria-hidden="true" />
        </div>

        {/* Actions — hidden for work projects */}
        {!isWork && (
          <div className="mt-auto d-flex flex-wrap gap-2 card-actions">
            {project.links?.demo && (
              <Button
                size="sm"
                variant="outline-primary"
                href={project.links.demo}
                onClick={(e) => e.stopPropagation()}
              >
                Demo
              </Button>
            )}
            {project.links?.github && (
              <Button
                size="sm"
                variant="outline-secondary"
                href={project.links.github}
                onClick={(e) => e.stopPropagation()}
              >
                Code
              </Button>
            )}
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(project);
              }}
            >
              Details
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}