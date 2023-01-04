import { useEffect, useState } from "react";
import "../style/score.css";
import "../style/progressbar.css";
import blob from "../assets/blob.png";
import Clicker from "./Clicker";
import Experiencebar from "./Experiencebar";
import Zones from "./Zones";

export default function Game(props) {
  let [power, setPower] = useState(10);
  let [score, setScore] = useState(0);
  let [maxLife, setMaxLife] = useState(10);
  let [life, setLife] = useState(maxLife);
  let [experience, setExperience] = useState(0);
  let [monsterZone, setMonsterZone] = useState(1);
  const handleDeath = () => {
    if (life > 0) {
      setLife(life - power);
      setExperience(experience + 1);
    }
  };
  useEffect(() => {
    if (life <= 0) {
      setScore(score + monsterZone);
      setLife((life = maxLife));
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
      <Zones
        life={life}
        maxLife={maxLife}
        setMaxLife={setMaxLife}
        monsterZone={monsterZone}
        setMonsterZone={setMonsterZone}
      />
      <progress max={maxLife} value={life} className="healthbar" />
      <p>{life} HP</p>
      <Clicker score={score} setLife={setLife} setScore={setScore} />
      <p className="score">{Math.round(score * 100) / 100}</p>
    </div>
  );
}
