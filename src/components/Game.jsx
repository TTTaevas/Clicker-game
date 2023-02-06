import { useState, useRef, useEffect } from "react";
import "../style/game.css";
import "../style/progressbar.css";
import blob from "../../assets/blob.png";
import hurtblob from "../../assets/hurtBlob.png";
import deadblob from "../../assets/deadBlob.png";
import ghost from "../../assets/ghost.png";
import deadghost from "../../assets/deadGhost.png";
import hurtghost from "../../assets/hurtGhost.png";
import skeleton from "../../assets/skeleton.png";
import target from "../../assets/target.png";
import Shop from "./Shop";
import Experiencebar from "./Experiencebar";
import Zones from "./Zones";
import Debug from "./Debug";

export default function Game() {
  const allowDebug = true;
  const [potion, setPotion] = useState(false);
  const [currentMob, setCurrentMob] = useState(skeleton);
  const [currentMobClass, setCurrentMobClass] = useState("skeleton");
  const [blobState, setBlobState] = useState(0);
  const [maxMonsterCount, setMaxMonsterCount] = useState(5);
  let [level, setLevel] = useState(1);
  let [cps, setCps] = useState(0);
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
  const hurtMob = [currentMob.slice(0, 8), "hurt", currentMob.slice(8)].join(
    ""
  );
  const deadMob = [currentMob.slice(0, 8), "dead", currentMob.slice(8)].join(
    ""
  );
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    setContainerDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    });
  }, []);

  const displayNumber = (num) => {
    let str = String(Math.round(num));
    if (str.length < 4) {
      return str;
    }
    let shorthands = [
      "",
      "K",
      "M",
      "B",
      "T",
      "q",
      "Q",
      "s",
      "S",
      "O",
      "N",
      "d",
      "U",
      "D",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
    ];

    let i = 0;
    while (str.length > 6) {
      i++;
      str = str.substring(0, str.length - 3);
    }

    let e = str.length - 3;
    let display = `${str.substring(0, e)},${str.substring(e, str.length)}`;
    display += shorthands[i];
    return display;
  };

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
      let spriteTimer = 100;
      if (life === 1) {
        setBlobState(2);
        spriteTimer = 300;
      } else {
        setBlobState(1);
      }
      clickPerSecond();
      setTimeout(() => {
        setBlobState(0);
      }, spriteTimer);
    }
    if (life === 1) {
      const mob = Math.random() * 30;
      if (mob <= 10) {
        setCurrentMob(skeleton);
        setCurrentMobClass("skeleton");
      } else if (mob < 20) {
        setCurrentMob(ghost);
        setCurrentMobClass("ghost");
      } else if (mob < 30) {
        setCurrentMob(blob);
        setCurrentMobClass("blob");
      }
    }
  };
  const attackBoss = () => {
    if (life > 0 && monsterZone % 10 === 0) {
      setLife(life - power * 7);
      if (potion === true) {
        setExperience(experience + 10);
      } else {
        setExperience(experience + 5);
      }
      setRandomPosition();
    }
    setBlobState(1);
    clickPerSecond();
    setTimeout(() => {
      setBlobState(0);
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
            id={currentMobClass}
          >
            {blobState === 0 && (
              <img src={currentMob} alt="monster" id={currentMobClass} />
            )}
            {blobState === 1 && (
              <img src={hurtMob} alt="monster" id={currentMobClass} />
            )}
            {blobState === 2 && (
              <img src={deadMob} alt="monster" id={currentMobClass} />
            )}
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
                draggable="false"
                onDragStart={() => {
                  return false;
                }}
                style={{
                  width: "50px",
                  position: "absolute",
                  left: imagePosition.x,
                  top: imagePosition.y,
                  MozUserSelect: "none",
                }}
              />
            </button>
          )}
        </div>
        <div className="bottomGame">
          <Zones
            displayNumber={displayNumber}
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
            setBlobState={setBlobState}
            setCurrentMob={setCurrentMob}
            setCurrentMobClass={setCurrentMobClass}
          />
        </div>
      </div>
      <div className="health">
        <div className="healthbarcontainer">
          <div
            style={{ width: `${(life / maxLife) * 100}%` }}
            className="healthbar"
          ></div>
        </div>
        <p className="healthcounter">
          {displayNumber(life)} / {displayNumber(maxLife)} HP
        </p>
      </div>
      <footer>
        <Shop
          displayNumber={displayNumber}
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
