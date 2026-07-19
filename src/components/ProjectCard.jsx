import React, { useRef, useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { isRealLink } from "../utils/links.js";

export default function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const isWork = project.category === "work" && project.categorygroup != "WellingtonAccess";
  // const isWellingtonAccess = project.categorygroup === "WellingtonAccess";

  // Several entries declare type:"video" but point `preview` at a still image.
  // Verify the extension (same guard ProjectModal uses) so we don't swap the
  // poster out for a <video> that can never render.
  const hasVideo =
    project.media?.type === "video" &&
    project.media.preview &&
    /\.(mp4|webm|ogg)$/i.test(project.media.preview);
  const hasGif =
    project.media?.type === "gif" &&
    project.media.preview &&
    /\.gif$/i.test(project.media.preview);

  // Only fade the poster out when there is actually something behind it.
  const hasHoverMedia = hasVideo || hasGif;

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

  // The card is the only way into the modal for "work" projects, whose action
  // buttons are hidden below — without this it is unreachable by keyboard.
  const onKeyDown = (e) => {
    if (e.target !== e.currentTarget) return; // let nested buttons handle their own keys
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Space would otherwise scroll the page
      onOpen(project);
    }
  };

  return (
    <Card
      className="h-100 border-0 project-card"
      data-category={project.category}
      data-categorygroup={project.categorygroup}
      onClick={() => onOpen(project)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onKeyDown={onKeyDown}
      onFocus={onEnter}
      onBlur={onLeave}
      role="button"
      tabIndex={0}
      aria-label={`${project.title} — view details`}
    >
      <div className="ratio ratio-16x9 overflow-hidden rounded-top media-wrap position-relative">
        {/* Base static image */}
        <img
          src={project.media?.poster || project.img}
          alt={project.title}
          className={`w-100 h-100 object-fit-cover position-absolute top-0 start-0 transition-opacity ${hovered && hasHoverMedia ? "opacity-0" : "opacity-100"
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
            {/* Open externally, matching ProjectModal — following these in the
                same tab navigates the visitor off the portfolio entirely. */}
            {isRealLink(project.links?.demo) && (
              <Button
                size="sm"
                variant="outline-primary"
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} — live demo (opens in a new tab)`}
                onClick={(e) => e.stopPropagation()}
              >
                Demo
              </Button>
            )}
            {isRealLink(project.links?.github) && (
              <Button
                size="sm"
                variant="outline-secondary"
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} — source code (opens in a new tab)`}
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