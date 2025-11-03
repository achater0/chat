import React from "react";
export default function Title({className = ""}) {
  return (
    <div className={`title ${className}`}>
      <img src="/assets/paddle.svg" alt="paddle icon" />
      <h1>CYBER PONG</h1>
    </div>
  );
}
