import React from "react";

const badges = ["First Win", "Streak Master", "Tournament Veteran"];

export default function Profile() {
    return <div className="profile">
    <div className="infos-wrapper">
      <div className="profile-img">
        <img src="/assets/profile.png" alt="" />
      </div>
      <div className="infos">
        <div>
          <h1 className="greeting">
            Good afternoon, <span>Username</span>!
          </h1>
          <p className="title">Pedal warrior</p>
        </div>
        <div className="level">
          <div className="text">
            <p>Level 15</p>
            <p>2760/3000 XP</p>
          </div>
          <div className="level-bar">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
      <div className="achievements">
        <p>Achievements: </p>
        {badges.map((badge) => {
          return (
            <div className="badge">
              <img src="/assets/badge.svg" alt="" />
              <p>{badge}</p>
            </div>
          );
        })}
      </div>
    </div>
    <div className="stats-wrapper">
      <div className="stat">
        <h3>15</h3>
        <p>global rank</p>
      </div>
      <div className="stat">
        <h3>5</h3>
        <p>win streak</p>
      </div>
      <div className="stat">
        <h3>1247</h3>
        <p>total points</p>
      </div>
    </div>
  </div>
}