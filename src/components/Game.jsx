import { useState } from "react";
import "../style/score.css";
import blob from "../assets/blob.png";
import Clicker from "./Clicker";

export default function Game(props) {
  const [score, setScore] = useState(0);
  return (
    <div className="scorecontainer">
      <img
        src={blob}
        alt="monster"
        className="blob"
        onClick={() => setScore(score + 1)}
      />
      <Clicker score={score} setScore={setScore} />
      <p className="score">{score}</p>
    </div>
  );
}
