export default function Food({ pixel }) {
    const foodStyle = {
      gridRow: pixel.x,
      gridColumn: pixel.y,
    };
    return <div className="food" style={foodStyle}></div>;
  }