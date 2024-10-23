import React from "react";
import "./style.css";

const Snake = ({ pixel }) => {
  return (
    <div
      className="snake"
      style={{ gridColumn: pixel.y, gridRow: pixel.x }}
    ></div>
  );
};

export default Snake;