// src/components/ProjectModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { isRealLink } from "../utils/links.js";

export default function ProjectModal({ project, onHide }) {
  const videoRef = useRef(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  // `project` goes null the moment the modal starts closing, but Bootstrap
  // still runs a 0.3s fade-out — rendering straight off `project` blanks the
  // dialog for ~150ms of that. Keep the last one until the exit finishes.
  const [shown, setShown] = useState(project);
  useEffect(() => {
    if (project) setShown(project);
  }, [project]);

  // Otherwise this stays true from the first project opened, so the fade-in
  // never runs again and a later failed load shows at full opacity.
  useEffect(() => {
    setMediaLoaded(false);
  }, [shown?.id]);

  const media = shown?.media;
  const mediaType = media?.type;
  const modalSrc = media?.modal || media?.preview; // fallback to preview
  const poster = media?.poster || shown?.img;

  const isVideo =
    mediaType === "video" &&
    modalSrc &&
    /\.(mp4|webm|ogg)$/i.test(modalSrc);

  const isGif =
    mediaType === "gif" &&
    modalSrc &&
    /\.(gif)$/i.test(modalSrc);

  useEffect(() => {
    if (!project) return; // modal closed
    const vid = videoRef.current;

    if (isVideo && vid) {
      try {
        vid.currentTime = 0;
        const playPromise = vid.play();
        if (playPromise?.catch) playPromise.catch(() => { });
      } catch {
        /* ignore autoplay errors */
      }
    }

    // Cleanup when modal closes or project changes
    return () => {
      try {
        if (vid) vid.pause();
      } catch {
        /* ignore stale refs */
      }
    };
  }, [project, isVideo]);

  return (
    <Modal
      show={!!project}
      onHide={onHide}
      centered
      size="lg"
      contentClassName="project-modal-content border-0 rounded-4 overflow-hidden shadow-lg"
      backdropClassName="project-modal-backdrop"
      onExited={() => setShown(null)}
    >
      {shown && (
        <>
          <Modal.Header closeButton className="border-0 px-4 pt-3">
            <Modal.Title className="fw-bold">{shown.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="px-4 pb-4 pt-2">
            {/* Media (Video / GIF / Image) */}
            <div
              className={`ratio ratio-16x9 mb-3 rounded-3 overflow-hidden fade-media ${mediaLoaded ? "fade-in" : "fade-out"
                }`}
            >
              {isVideo ? (
                <video
                  ref={videoRef}
                  className="w-100 h-100 object-fit-cover"
                  src={modalSrc}
                  poster={poster}
                  muted
                  playsInline
                  loop
                  controls
                  onLoadedData={() => setMediaLoaded(true)}
                />
              ) : isGif ? (
                <img
                  src={modalSrc}
                  alt={`${shown.title} demo`}
                  className="w-100 h-100 object-fit-cover"
                  onLoad={() => setMediaLoaded(true)}
                />
              ) : (
                <img
                  src={poster}
                  alt={shown.title}
                  className="w-100 h-100 object-fit-cover"
                  onLoad={() => setMediaLoaded(true)}
                />
              )}
            </div>

            {/* Display all tags */}
            {shown.tags?.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mb-3">
                {shown.tags.map((tg) => (
                  <Badge key={tg} bg="secondary" pill>
                    {tg}
                  </Badge>
                ))}
              </div>
            )}

            {/* Project blurb */}
            <p className="mb-3">{shown.blurb}</p>

            {/* Action buttons */}
            <div className="d-flex gap-2 flex-wrap">
              {isRealLink(shown.links?.demo) && (
                <Button
                  variant="primary"
                  href={shown.links.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </Button>
              )}
              {isRealLink(shown.links?.github) && (
                <Button
                  variant="outline-secondary"
                  href={shown.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source Code
                </Button>
              )}
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}