import React from "react";

export default function Buttons() {
    return <div className="buttons">
    <div className="quick-match">
      <div className="icon green">
        <img src="/assets/play-one.svg" alt="" />
      </div>
      <div className="text-content">
        <h3>Quick Match</h3>
        <p className="font-open-sans">Jump into a game instantly</p>
      </div>
    </div>
    <div className="tournament">
      <div className="icon yellow">
        <img src="/assets/trophy.svg" alt="" />
      </div>
      <div className="text-content">
        <h3>Tournament</h3>
        <p className="font-open-sans">Join or create tournaments</p>
      </div>
    </div>
    <div className="statistics">
      <div className="icon purple">
        <img src="/assets/internal-data.svg" alt="" />
      </div>
      <div className="text-content">
        <h3>Statistics</h3>
        <p className="font-open-sans">View your performance</p>
      </div>
    </div>
    <div className="rankings">
      <div className="icon cyan">
        <img src="/assets/chart-graph.svg" alt="" />
      </div>
      <div className="text-content">
        <h3>Rankings</h3>
        <p className="font-open-sans">Global leaderboard</p>
      </div>
    </div>
  </div>
}