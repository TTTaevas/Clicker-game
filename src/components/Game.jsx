import { useState, useRef, useEffect } from "react";
import "../style/score.css";
import "../style/progressbar.css";
import blob from "../../assets/blob.png";
import target from "../../assets/target.png";
import Shop from "./Shop";
import Experiencebar from "./Experiencebar";
import Zones from "./Zones";

export default function Game() {
  const [potion, setPotion] = useState(false);
  let [power, setPower] = useState(100);
  let [score, setScore] = useState(100000000000000);
  let [maxLife, setMaxLife] = useState(10);
  let [life, setLife] = useState(maxLife);
  let [experience, setExperience] = useState(0);
  let [monsterZone, setMonsterZone] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    setContainerDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    });
  }, []);

  const setRandomPosition = () => {
    setImagePosition({
      x: Math.floor(Math.random() * containerDimensions.width),
      y: Math.floor(Math.random() * containerDimensions.height),
    });
  };
  const attackMonster = () => {
    if (life > 0 && monsterZone % 10 !== 0) {
      setLife(life - power);
      if (potion === true) {
        setExperience(experience + 2);
      } else {
        setExperience(experience + 1);
      }
    }
  };
  const attackBoss = () => {
    if (life > 0 && monsterZone % 10 === 0) {
      setIsClickDisabled(true);
      setLife(life - power * 3);
      setExperience(experience + 5);
      setRandomPosition();
    }
  };
  return (
    <div className="scorecontainer">
      <Experiencebar
        setExperience={setExperience}
        experience={experience}
        power={power}
        setPower={setPower}
      />
      <div className="clickzone" ref={containerRef}>
        <img
          src={blob}
          alt="monster"
          className="blob"
          onClick={() => attackMonster()}
          disabled={isClickDisabled}
        />
        {monsterZone % 10 === 0 && (
          <img
            src={target}
            alt="random"
            style={{
              width: "50px",
              position: "absolute",
              left: imagePosition.x,
              top: imagePosition.y,
            }}
            onClick={() => attackBoss()}
          />
        )}
      </div>

      <Zones
        score={score}
        setScore={setScore}
        life={life}
        setLife={setLife}
        maxLife={maxLife}
        setMaxLife={setMaxLife}
        monsterZone={monsterZone}
        setMonsterZone={setMonsterZone}
      />

      <progress max={maxLife} value={life} className="healthbar" />
      <p>{life} HP</p>
      <Shop
        potion={potion}
        setPotion={setPotion}
        score={score}
        setLife={setLife}
        setScore={setScore}
        experience={experience}
        setExperience={setExperience}
      />
      <p className="score">{Math.round(score)}</p>
    </div>
  );
}
