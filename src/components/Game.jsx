import { useState, useRef, useEffect } from "react";
import "../style/game.css";
import "../style/experience.css";
import "../style/progressbar.css";
import blob from "../../assets/blob.png";
import hurtblob from "../../assets/hurtBlob.png";
import deadblob from "../../assets/deadBlob.png";
import ghost from "../../assets/ghost.png";
import deadghost from "../../assets/deadGhost.png";
import hurtghost from "../../assets/hurtGhost.png";
import skeleton from "../../assets/skeleton.png";
import hurtskeleton from "../../assets/hurtSkeleton.png";
import deadskeleton from "../../assets/hurtSkeleton.png";
import target from "../../assets/target.png";
import Shop from "./Shop";
import Zones from "./Zones";
import Debug from "./Debug";

export default function Game() {
  const allowDebug = true;
  const [potion, setPotion] = useState(0);
  const [firstBgStatus, setFirstBgStatus] = useState("bg1");
  const [secondBgStatus, setSecondBgStatus] = useState("bg2");
  const [currentMob, setCurrentMob] = useState(blob);
  const [currentHurtMob, setCurrentHurtMob] = useState(hurtblob);
  const [currentDeadMob, setCurrentDeadMob] = useState(deadblob);
  const [currentMobClass, setCurrentMobClass] = useState("blob");
  const [blobState, setBlobState] = useState(0);
  const [nextZoneText, setNextZoneText] = useState(false);
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
  const changeSprites = () => {
    const mob = Math.random() * 30;
    if (mob <= 10) {
      setCurrentMob(skeleton);
      setCurrentHurtMob(hurtskeleton);
      setTimeout(() => {
        setCurrentDeadMob(deadskeleton);
        setCurrentMobClass("skeleton");
      }, 300);
    } else if (mob < 20) {
      setCurrentMob(ghost);
      setCurrentHurtMob(hurtghost);
      setTimeout(() => {
        setCurrentDeadMob(deadghost);
        setCurrentMobClass("ghost");
      }, 300);
    } else if (mob < 30) {
      setCurrentMob(blob);
      setCurrentHurtMob(hurtblob);
      setTimeout(() => {
        setCurrentDeadMob(deadblob);
        setCurrentMobClass("blob");
      }, 300);
    }
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
      if (potion === 3) {
        setLife(life - (power * 2));
      } else {
        setLife(life - power);
      }
      if (potion === 1) {
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
  };
  const attackBoss = () => {
    if (life > 0 && monsterZone % 10 === 0) {
      if (potion === 3) {
        setLife(life - ((power * 7) * 2));
      } else {
        setLife(life - (power * 7));
      }
      if (potion === 1) {
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
      <div className="backgroundContainer">
        <div className={secondBgStatus} />
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
              onClick={() => attackMonster()}
              id={currentMobClass}
            >
              {blobState === 0 && (
                <img src={currentMob} alt="monster" id={currentMobClass} />
              )}
              {blobState === 1 && (
                <img src={currentHurtMob} alt="monster" id={currentMobClass} />
              )}
              {blobState === 2 && (
                <img src={currentDeadMob} alt="monster" id={currentMobClass} />
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
          {nextZoneText && <h2 className="nextZoneText">Next Zone...</h2>}
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
              changeSprites={changeSprites}
              setFirstBgStatus={setFirstBgStatus}
              setSecondBgStatus={setSecondBgStatus}
              setNextZoneText={setNextZoneText}
            />
          </div>
        </div>
        <div className={firstBgStatus} />
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
          experience={experience}
          setExperience={setExperience}
          cps={cps}
          level={level}
        />
      </footer>
    </>
  );
}
