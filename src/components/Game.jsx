import { useEffect, useState } from "react";
import "../style/score.css";
import blob from "../assets/blob.png";
import Clicker from "./Clicker";

export default function Game(props) {
  let [score, setScore] = useState(10);
  let [life, setLife] = useState(10);
  const handleDeath = () => {
    if (life <= 0) {
      setScore(score + 1);
      setLife((life = 10));
    } else {
      setLife(life - 1);
    }
  };
  useEffect(() => {
    if (life <= 0) {
      setScore(score + 1);
      setLife((life = 10));
    }
  }, [life]);
  return (
    <div className="scorecontainer">
      <img
        src={blob}
        alt="monster"
        className="blob"
        onClick={() => handleDeath()}
      />
      <progress max={10} value={life} />
      <p>{life} HP</p>
      <Clicker score={score} setLife={setLife} setScore={setScore} />
      <p className="score">{score}</p>
    </div>
  );
}
