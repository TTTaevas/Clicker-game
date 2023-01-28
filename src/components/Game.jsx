import { useState, useRef, useEffect } from "react";
import "../style/game.css";
import "../style/progressbar.css";
import blob from "../../assets/blob.png";
import hurtBlob from "../../assets/hurtBlob.png";
import target from "../../assets/target.png";
import Shop from "./Shop";
import Experiencebar from "./Experiencebar";
import Zones from "./Zones";
import Debug from "./Debug";

export default function Game() {
  const allowDebug = true;
  const [potion, setPotion] = useState(false);
  const [blobClicked, setBlobClicked] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  let [dps, setDps] = useState(0);
  let [level, setLevel] = useState(1);
  let [power, setPower] = useState(1);
  let [score, setScore] = useState(0);
  let [maxLife, setMaxLife] = useState(10);
  let [life, setLife] = useState(maxLife);
  let [experience, setExperience] = useState(0);
  let [monsterZone, setMonsterZone] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 100, y: 100 });
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

  const dealDps = (damage) => {
    setDps(dps + damage)
    clearInterval(intervalId);
    if (dps + damage > 0) {
      setIntervalId(
        setInterval(
          () => setLife((oldLife) => oldLife - 1),
          (1000 / (dps + damage)) * 0.93
        )
      );
    }
  };
  const attackMonster = () => {
    if (monsterZone % 10 === 0) return;
    if (life > 0) {
      setLife(life - power);
      if (potion === true) {
        setExperience(experience + 2);
      } else {
        setExperience(experience + 1);
      }
    }
    setBlobClicked(true);
    setTimeout(() => {
      setBlobClicked(false);
    }, 100);
  };
  const attackBoss = () => {
    if (life > 0 && monsterZone % 10 === 0) {
      setLife(life - power * 3);
      if (potion === true) {
        setExperience(experience + 10);
      } else {
        setExperience(experience + 5);
      }
      setRandomPosition();
    }
    setBlobClicked(true);
    setTimeout(() => {
      setBlobClicked(false);
    }, 100);
  };
  return (
    <>
      {allowDebug === true && (
        <Debug
          setPower={setPower}
          setScore={setScore}
          setExperience={setExperience}
          setMonsterZone={setMonsterZone}
        />
      )}
      <div className="gameContainer">
        <Experiencebar
          setExperience={setExperience}
          experience={experience}
          power={power}
          setPower={setPower}
          level={level}
          setLevel={setLevel}
        />
        <div className="clickzone" ref={containerRef}>
          <button
            type="button"
            onClick={() => attackMonster()}
            className="blob"
          >
            <img
              src={blob}
              alt="monster"
              className="blob"
              style={{ display: blobClicked ? "none" : "inline" }}
            />
            <img
              src={hurtBlob}
              alt="monster"
              className="blob"
              style={{ display: blobClicked ? "inline" : "none" }}
            />
          </button>
          {monsterZone % 10 === 0 && (
            <button
              type="button"
              className="target"
              onClick={() => attackBoss()}
            >
              <img
                src={target}
                alt="random"
                style={{
                  width: "50px",
                  position: "absolute",
                  left: imagePosition.x,
                  top: imagePosition.y,
                }}
              />
            </button>
          )}
        </div>
        <div className="bottomGame">
          <Zones
            score={score}
            setScore={setScore}
            life={life}
            setLife={setLife}
            maxLife={maxLife}
            setMaxLife={setMaxLife}
            monsterZone={monsterZone}
            setMonsterZone={setMonsterZone}
            experience={experience}
            setExperience={setExperience}
            potion={potion}
          />
        </div>
      </div>
      <div className="health">
        <progress max={maxLife} value={life} className="healthbar" />
        <p className="healthcounter">
          {life} / {maxLife} HP
        </p>
      </div>
      <footer>
        <Shop
          dps={dps}
          dealDps={dealDps}
          score={score}
          setScore={setScore}
          potion={potion}
          setPotion={setPotion}
          power={power}
          setPower={setPower}
          level={level}
        />
      </footer>
    </>
  );
}
