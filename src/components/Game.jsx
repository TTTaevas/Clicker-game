import { useState, useRef, useEffect } from "react";
import "../style/game.css";
import "../style/experience.css";
import "../style/progressbar.css";
import blob from "../../assets/blob.png";
import hurtBlob from "../../assets/hurtBlob.png";
import target from "../../assets/target.png";
import Shop from "./Shop";
import Zones from "./Zones";
import Debug from "./Debug";

export default function Game() {
  const allowDebug = true;
  const [potion, setPotion] = useState(false);
  const [blobClicked, setBlobClicked] = useState(false);
  const [maxMonsterCount, setMaxMonsterCount] = useState(Number(localStorage.getItem("maxMonsterCount")) || 5);
  let [level, setLevel] = useState(Number(localStorage.getItem("level")) || 1);
  let [cps, setCps] = useState(0);
  let [power, setPower] = useState(Number(localStorage.getItem("power")) || 1);
  let [score, setScore] = useState(Number(localStorage.getItem("score")) || 0);
  let [maxLife, setMaxLife] = useState(Number(localStorage.getItem("maxLife")) || 10);
  let [life, setLife] = useState(Number(localStorage.getItem("life")) || maxLife);
  let [experience, setExperience] = useState(Number(localStorage.getItem("experience")) || 0);
  let [maxExperience, setMaxExperience] = useState(Number(localStorage.getItem("maxExperience")) || 100);
  let [monsterZone, setMonsterZone] = useState(Number(localStorage.getItem("monsterZone")) || 1);
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

  useEffect(() => {localStorage.setItem("maxMonsterCount", maxMonsterCount)}, [maxMonsterCount])
  useEffect(() => {localStorage.setItem("level", level)}, [level])
  useEffect(() => {localStorage.setItem("power", power)}, [power])
  useEffect(() => {localStorage.setItem("score", score)}, [score])
  useEffect(() => {localStorage.setItem("maxLife", maxLife)}, [maxLife])
  useEffect(() => {localStorage.setItem("life", life)}, [life])
  useEffect(() => {localStorage.setItem("monsterZone", monsterZone)}, [monsterZone])
  useEffect(() => {
    if (experience >= maxExperience) {
      setExperience(0);
      setMaxExperience(Math.round(maxExperience * 1.4));
      setLevel(level + 1);
      setPower(power + 1);
    }
    localStorage.setItem("experience", experience)
  }, [experience])
  useEffect(() => {localStorage.setItem("maxExperience", maxExperience)}, [maxExperience])

  const clickPerSecond = () => {
    setCps(cps + 1);
    setTimeout(() => setCps((cps) => cps - 1), 1000);
  };

  const setRandomPosition = () => {
    setImagePosition({
      x: Math.floor(Math.random() * containerDimensions.width),
      y: Math.floor(Math.random() * containerDimensions.height),
    });
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
    clickPerSecond();
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
    clickPerSecond();
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
        <div className="experience">
          <h2> Level {level}</h2>
          <progress max={maxExperience} value={experience} /> <br />
          {experience}/{maxExperience} XP
        </div>
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
            maxMonsterCount={maxMonsterCount}
            setMaxMonsterCount={setMaxMonsterCount}
          />
        </div>
      </div>
      <div className="health">
        <div className="healthbarcontainer">
          <div style={{width:`${(life / maxLife) * 100}%`}} className="healthbar"></div>
        </div>
        <p className="healthcounter">
          {Math.round(life)} / {maxLife} HP
        </p>
      </div>
      <footer>
        <Shop
          potion={potion}
          setPotion={setPotion}
          score={score}
          life={life}
          setLife={setLife}
          setScore={setScore}
          power={power}
          setPower={setPower}
          cps={cps}
          level={level}
        />
      </footer>
    </>
  );
}
