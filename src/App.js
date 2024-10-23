import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [direction, setDirection] = useState(0);

  const stopGame = () => {
    setHasGameStarted(false);
  };

  const startGame = () => {
    setHasGameStarted(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
  
      if (!hasGameStarted) {
        if (e.code === " " || e.code === "Space") {
          startGame();
        }
      } else {
        switch (e.key) {
          case "ArrowUp":
            if (direction !== 3) setDirection(1); // Move up if not going down
            break;
          case "ArrowRight":
            if (direction !== 4) setDirection(2); // Move right if not going left
            break;
          case "ArrowDown":
            if (direction !== 1) setDirection(3); // Move down if not going up
            break;
          case "ArrowLeft":
            if (direction !== 2) setDirection(4); // Move left if not going right
            break;
          default:
            break;
        }
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [hasGameStarted]);

  return (
    <div className="App" tabIndex="0">
      <Board
        direction={direction}
        hasGameStarted={hasGameStarted}
        stopGame={stopGame}
      />
    </div>
  );
}

export default App;