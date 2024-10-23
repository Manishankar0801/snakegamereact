import React from "react";

const Food = ({ pixel }) => {
  return (
    <div className="food" style={{ gridColumn: pixel.y, gridRow: pixel.x }}></div>
  );
};

export default Food;