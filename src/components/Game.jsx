import { useState, useRef, useEffect } from "react";
import "../style/game.css";
import "../style/progressbar.css";
import blob from "../../assets/blob.png";
import hurtBlob from "../../assets/hurtBlob.png";
import target from "../../assets/target.png";
import Shop from "./Shop";
import Experiencebar from "./Experiencebar";
import Zones from "./Zones";

export default function Game() {
  const [potion, setPotion] = useState(false);
  const [blobClicked, setBlobClicked] = useState(false);
  let [power, setPower] = useState(1);
  let [score, setScore] = useState(10000000);
  let [maxLife, setMaxLife] = useState(10);
  let [life, setLife] = useState(maxLife);
  let [experience, setExperience] = useState(0);
  let [monsterZone, setMonsterZone] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
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
      <div className="gameContainer">
        <Experiencebar
          setExperience={setExperience}
          experience={experience}
          power={power}
          setPower={setPower}
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
          potion={potion}
          setPotion={setPotion}
          score={score}
          setLife={setLife}
          setScore={setScore}
          power={power}
          setPower={setPower}
        />
      </footer>
    </>
  );
}
