import React from "react";

export default function LiveActivity() {
  return (
    <div className="live-activity">
      <div className="header">
        <div className="title">
          <img src="/assets/peoples-two.svg" alt="" />
          <h3>Live Activity</h3>
        </div>
      </div>
      <div className="live-activity-content">
        <div className="players-online">
          <h3>6</h3>
          <p>Players online</p>
        </div>
        <div className="active-matches">
          <h3>2</h3>
          <p>Active Matches</p>
        </div>
        <div className="active-tournaments">
          <h3>2</h3>
          <p>Tournaments</p>
        </div>
      </div>
    </div>
  );
}
