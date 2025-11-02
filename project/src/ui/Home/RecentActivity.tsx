import React from "react";

export default function RecentActivity() {
  return (
    <div className="recent-activity">
      <div className="header">
        <div className="title">
          <img src="/assets/history.svg" alt="" />
          <h3>Recent Activity</h3>
        </div>
      </div>
      <div className="activities">
        <div className="activity last-match">
          <div className="activity-title">
            <img src="/assets/go-on.svg" alt="" />
            <h4>Last Match</h4>
          </div>
          <span>Won vs Player2</span>
        </div>
        <div className="activity recent-tournament">
          <div className="activity-title">
            <img src="/assets/trophy-activity.svg" alt="" />
            <h4>Tournament</h4>
          </div>
          <span>2nd Place</span>
        </div>
        <div className="activity global-rank">
          <div className="activity-title">
            <img src="/assets/ranking.svg" alt="" />
            <h4>Global Rank</h4>
          </div>
          <span>#15</span>
        </div>
        <div className="activity win-streak">
          <div className="activity-title">
            <img src="/assets/fire.svg" alt="" />
            <h4>Win Streak</h4>
          </div>
          <span>5 Matches</span>
        </div>
      </div>
    </div>
  );
}
