import React from "react";
export default function Controls() {
  return (
    <div className="controls border">
      <h2 className="controls-title">Try controls while you wait</h2>
      <div className="paddles-container">
        <h3 className="left">Left Paddle</h3>
        <h3 className="right">Right Paddle</h3>
        <div>
          <p>W - move Up</p>
          <p>S - move Down</p>
        </div>
        <div>
          <p>↑ - move Up</p>
          <p>↓ - move Down</p>
        </div>
      </div>
    </div>
  );
}
