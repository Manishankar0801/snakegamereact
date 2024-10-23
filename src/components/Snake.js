export default function Snake({ pixel }) {
    const snakeStyle = {
      gridRow: pixel.x,
      gridColumn: pixel.y,
    };
    return <div className="snake" style={snakeStyle}></div>;
  }