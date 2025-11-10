import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTop({ visible }) {
  return (
    <Button
      aria-label="Scroll to top"
      className={`scroll-top-btn ${visible ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaArrowUp />
    </Button>
  );
}
