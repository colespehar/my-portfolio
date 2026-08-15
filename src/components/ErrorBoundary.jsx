import React from "react";

/**
 * Guards the React.lazy section chunks. A chunk fetch can fail for reasons
 * unrelated to the code — most commonly when a redeploy replaces hashed
 * filenames while someone still has the old index.html open. Without a
 * boundary that failure unmounts the whole app and leaves a blank page.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Keep the detail in the console; this is a static site with no telemetry.
    console.error("Section failed to render:", error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="container py-5 text-center">
          <p className="text-body-secondary mb-3">
            This section couldn’t be loaded.
          </p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
