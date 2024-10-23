import React from "react";
import "./style.css";

const Instructions = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "400px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={require("../snake-game-ai-gen.png")}
        alt="snake-logo"
        id="logo"
      />
      <h4 id="instruction__text">
        Press spacebar to start the game <br /> Developed By: Mani Shankar Janumpalli
      </h4>
    </div>
  );
};

export default Instructions;