import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTop({ visible }) {
  return (
    <Button
      aria-label="Scroll to top"
      className={`scroll-top-btn ${visible ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      // The hidden state is opacity + pointer-events, which stops the mouse but
      // not the Tab key — without these, keyboard users land on an invisible
      // button floating over the page.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <FaArrowUp aria-hidden="true" />
    </Button>
  );
}
