import { useState, useEffect, useRef } from "react";
import Instructions from "./Instructions";
import Snake from "./Snake";
import Food from "./Food";
import "./style.css";

const gridSize = 20;

const Board = ({ hasGameStarted, direction, stopGame }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [highScore, setHighScore] = useState(0);
  const [currScore, setCurrScore] = useState(0);
  const [food, setFood] = useState(generateFood());

  const gameInterval = useRef(null);

  // Generate new food
  function generateFood() {
    return {
      x: Math.floor(Math.random() * gridSize + 1),
      y: Math.floor(Math.random() * gridSize + 1),
    };
  }

  // Move the snake
  useEffect(() => {
    const move = () => {
      let head = { ...snake[0] };

      // Update head position based on direction
      switch (direction) {
        case 1: // Move up
          head.x--;
          break;
        case 2: // Move right
          head.y++;
          break;
        case 3: // Move down
          head.x++;
          break;
        case 4: // Move left
          head.y--;
          break;
        default:
          break;
      }

      // Check for food collision
      if (head.x === food.x && head.y === food.y) {
        setCurrScore(currScore + 1);
        setFood(generateFood());
        setSnake([head, ...snake]); // Grow the snake
      } else {
        setSnake([head, ...snake.slice(0, -1)]); // Move the snake
      }

      // Check for collisions with walls or itself
      if (
        head.x < 1 ||
        head.x > gridSize ||
        head.y < 1 ||
        head.y > gridSize ||
        snake.slice(1).some((part) => part.x === head.x && part.y === head.y)
      ) {
        stopGame(); // Stop the game on collision
        resetGame();
      }
    };

    if (hasGameStarted) {
      gameInterval.current = setInterval(move, 200);
    } else {
      clearInterval(gameInterval.current);
    }

    return () => clearInterval(gameInterval.current);
  }, [hasGameStarted, direction, snake, currScore, food, stopGame]);

  // Reset the game
  const resetGame = () => {
    setHighScore(Math.max(currScore, highScore));
    setCurrScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
  };

  return (
    <div>
      <div className="scores">
        <div id="currscore">{currScore.toString().padStart(3, "0")}</div>
        <div id="highscore">{highScore.toString().padStart(3, "0")}</div>
      </div>
      <div className="game__border__1">
        <div className="game__border__2">
          <div className="game__border__3">
            <div id="game__board">
              {hasGameStarted ? (
                <>
                  {snake.map((pixel, idx) => (
                    <Snake key={idx} pixel={pixel} />
                  ))}
                  <Food pixel={food} />
                </>
              ) : (
                <Instructions />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;