import React from "react";

export default function Counter({ refObj, end, label }) {
  return (
    <div className="text-center">
      <div
        ref={(el) => { if (el) refObj.current.push(el); }}
        data-end={end}
        className="display-4 fw-bold"
      >0</div>
      <div className="small opacity-75">{label}</div>
    </div>
  );
}
