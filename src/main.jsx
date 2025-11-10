import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global CSS & libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
