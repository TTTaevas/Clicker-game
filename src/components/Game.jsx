import { useEffect, useState } from "react";
import "../style/score.css";
import "../style/progressbar.css";
import blob from "../assets/blob.png";
import Clicker from "./Clicker";
import Experiencebar from "./Experiencebar";

export default function Game(props) {
  let [power, setPower] = useState(1);
  let [score, setScore] = useState(0);
  let [max_life, setMaxLife] = useState(10);
  let [life, setLife] = useState(max_life);
  let [experience, setExperience] = useState(0);
  const handleDeath = () => {
    if (life > 0) {
      setLife(life - power);
      setExperience(experience + 1);
    }
  };
  useEffect(() => {
    if (life <= 0) {
      setScore(score + 1);
      setLife((life = max_life));
    }
  }, [life]);
  return (
    <div className="scorecontainer">
      <Experiencebar
        setExperience={setExperience}
        experience={experience}
        power={power}
        setPower={setPower}
      />
      <img
        src={blob}
        alt="monster"
        className="blob"
        onClick={() => handleDeath()}
      />
      <progress max={max_life} value={life} className="healthbar" />
      <p>{life} HP</p>
      <Clicker score={score} setLife={setLife} setScore={setScore} />
      <p className="score">{score}</p>
    </div>
  );
}
