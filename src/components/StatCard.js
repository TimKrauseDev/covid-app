import React from "react";

const StatCard = ({ title, color, count, secondaryCount }) => {
  return (
    <div id="stat-card-wrapper" style={{ borderTop: `5px solid ${color}` }}>
      <div id="stat-title">
        <p>{title}</p>
      </div>
      <div id="stat-count">
        <h1 style={{ color: color }}>{count}</h1>
      </div>
      <div id="stat-subtitle">
        <p>{secondaryCount}</p>
      </div>
    </div>
  );
};

export default StatCard;
