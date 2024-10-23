import "./style.css";
export default function Instructions() {
  return (
    <div
      style={{
        display: "flex",
        width: "400px",
        height: "400px",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={require("../snake-game-ai-gen.png")}
        // src="../snake-game-ai-gen.png"
        alt="snake-logo"
        id="logo"
      />
      <h2 id="instruction-text">
        press Spacebar to Start The Game <br />
        Developed By: Mani Shankar Janumpalli
      </h2>
    </div>
  );
}