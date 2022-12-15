import { useState } from "react";
import "../style/score.css";
import blob from "../assets/blob.png";

export default function Score() {
  const [score, setScore] = useState(0);
  return (
    <div className="scorecontainer">
      <img
        src={blob}
        alt="monster"
        className="blob"
        onClick={() => setScore((score) => score + 1)}
      />
      <p className="score">{score}</p>
    </div>
  );
}
