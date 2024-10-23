import { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Instructions from "./Instructions";
import "./style.css";

export default function Board({ dir, gamehasstarted, stopGame }) {
  const gridsize = 20;
  let [gamespeed, setgamespeed] = useState(400);
  const [currscore, setcurrscore] = useState(0);
  const [highscore, sethighscore] = useState(0);
  // up --> 1 right --> 2

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const generateFood = () => {
    const x = Math.floor(Math.random() * gridsize) + 1;
    const y = Math.floor(Math.random() * gridsize) + 1;
    return { x, y };
  };
  const [foodlocation, setfoodlocation] = useState(generateFood());

  useEffect(() => {
    const interval = setInterval(move, gamespeed);
    return () => clearInterval(interval);
  });

  const move = () => {
    if (!gamehasstarted) return;
    let head = { ...snake[0] };
    switch (dir) {
      case 1:
        head.x--;
        break;
      case 2:
        head.y++;
        break;
      case 3:
        head.x++;
        break;
      case 4:
        head.y--;
        break;
      default:
        break;
    }
    //check collision
    if (head.x < 1 || head.y < 1 || head.x > gridsize || head.y > gridsize) {
      resetGame();
      return;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        resetGame();
        return;
      }
    }
    let newSnake = [...snake];
    newSnake.unshift(head);
    //eat food scenario
    if (head.x === foodlocation.x && head.y === foodlocation.y) {
      setfoodlocation(generateFood());
      increaseSpeed();
    } else {
      newSnake.pop();
    }
    setcurrscore(newSnake.length - 1);
    setSnake(newSnake);
  };

  function increaseSpeed() {
    if (gamespeed > 150) {
      gamespeed -= 20;
    } else if (gamespeed > 100) {
      gamespeed -= 3;
    } else if (gamespeed > 50) {
      gamespeed -= 2;
    } else {
      gamespeed -= 1;
    }
    setgamespeed(gamespeed);
  }

  const resetGame = () => {
    sethighscore(Math.max(highscore, currscore));
    setcurrscore(0);
    setgamespeed(400);
    setSnake([{ x: 10, y: 10 }]);
    stopGame();
  };

  return (
    <>
      <div className="scores">
        <h2 id="score">{currscore.toString().padStart(3, "0")}</h2>
        {gamehasstarted ? (
          <h2 id="highscore">{highscore.toString().padStart(3, "0")}</h2>
        ) : (
          <></>
        )}
      </div>
      <div className="game-border-1">
        <div className="game-border-2">
          <div className="game-border-3">
            {!gamehasstarted ? (
              <Instructions />
            ) : (
              <div id="game-board">
                <Food pixel={foodlocation} />
                {snake.map((pixel, idx) => (
                  <Snake pixel={pixel} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}