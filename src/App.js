import "./App.css";
import Board from "./components/Board";

import { useState } from "react";

function App() {
  const [gamehasstarted, setgamehasstarted] = useState(false);
  const [dir, setdir] = useState(2);
  const stopGame = () => {
    setgamehasstarted(false);
  };
  const startGame = () => {
    setgamehasstarted(true);
  };
  const handleKeyPress = (e) => {
    e.preventDefault();
    if (!gamehasstarted) {
      if (e.code === " " || e.code === "Space") {
        startGame();
      }
    } else {
      if (e.key === "ArrowUp") {
        setdir(1);
      } else if (e.key === "ArrowRight") {
        setdir(2);
      } else if (e.key === "ArrowDown") {
        setdir(3);
      } else if (e.key === "ArrowLeft") {
        setdir(4);
      }
    }
  };
  return (
    <div className="App" onKeyDown={handleKeyPress} tabIndex="0">
      {/* <header className="App-header"> */}
      <Board dir={dir} gamehasstarted={gamehasstarted} stopGame={stopGame} />
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
    </div>
  );
}

export default App;