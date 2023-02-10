import { useEffect, useState } from "react";
import "../style/zones.css";
import blob from "../../assets/blob.png";
import hurtblob from "../../assets/hurtBlob.png";
import deadblob from "../../assets/deadBlob.png";
import ghost from "../../assets/ghost.png";
import deadghost from "../../assets/deadGhost.png";
import hurtghost from "../../assets/hurtGhost.png";
import skeleton from "../../assets/skeleton.png";

export default function Zones({
  displayNumber,
  score,
  setScore,
  life,
  setLife,
  maxLife,
  setMaxLife,
  monsterZone,
  setMonsterZone,
  experience,
  setExperience,
  potion,
  maxMonsterCount,
  setMaxMonsterCount,
  setBlobState,
  changeSprites,
  setFirstBgStatus,
  setSecondBgStatus,
  setNextZoneText,
}) {
  const [monsterCount, setMonsterCount] = useState(Number(localStorage.getItem("monsterCount")) || 1);
  const [countdown, setCountdown] = useState(Number(localStorage.getItem("countdown")) || 30);
  const [beforeBossLife, setBeforeBossLife] = useState(Number(localStorage.getItem("beforeBossLife")) || 0);

  useEffect(() => {localStorage.setItem("monsterCount", monsterCount)}, [monsterCount])
  useEffect(() => {localStorage.setItem("countdown", countdown)}, [countdown])
  useEffect(() => {localStorage.setItem("beforeBossLife", beforeBossLife)}, [beforeBossLife])

  const spawnMonster = () => {
    if (monsterCount === maxMonsterCount) {
      setLife((life = 9999999999));
      setMaxLife(9999999999);
      setFirstBgStatus("animatebg1");
      setSecondBgStatus("animatebg2");
      setNextZoneText(true);
      document
        .getElementsByClassName("clickzone")[0]
        .classList.add("invisible");
      document
        .getElementsByClassName("zoneCount")[0]
        .classList.add("invisible");
      document.getElementsByClassName("health")[0].classList.add("invisible");
      setTimeout(() => {
        setNextZoneText(false);
        setFirstBgStatus("bg1");
        setSecondBgStatus("bg2");
        setMonsterCount(1);
        if ((monsterZone + 1) % 10 === 0) {
          setBeforeBossLife(maxLife);
          setMaxLife((maxLife = Math.round(monsterZone * 411)));
          setMaxMonsterCount(1);
          setMonsterZone(monsterZone + 1);
        } else {
          if (monsterZone % 10 === 0) {
            setMaxLife((maxLife = Math.round(maxLife * 0.3)));
          }
          setMaxLife(
            (maxLife = Math.round(
              10 * (monsterZone * 1.66) + beforeBossLife * 0.4
            ))
          );
          setMonsterZone(monsterZone + 1);
          setMaxMonsterCount(10);
        }
        document
          .getElementsByClassName("clickzone")[0]
          .classList.remove("invisible");
        document
          .getElementsByClassName("zoneCount")[0]
          .classList.remove("invisible");
        document
          .getElementsByClassName("health")[0]
          .classList.remove("invisible");
        setLife((life = maxLife));
      }, 1000);
    } else {
      setLife((life = maxLife));
    }
  };

  useEffect(() => {
    if (monsterZone % 10 === 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setCountdown(30);
    }
    if (countdown <= 0 && monsterZone % 10 === 0) {
      // If still against the boss when timer is done
      setMaxLife(beforeBossLife);
      setLife(beforeBossLife);
      setCountdown(30);
      setMonsterZone(monsterZone - 1);
      setMaxMonsterCount(10);
    }
    if (life <= 0) {
      if (potion === 2) {
        setScore(Math.round(score + monsterZone * maxLife * 0.2));
      } else {
        setScore(Math.round(score + monsterZone * maxLife * 0.1));
      }
      setMonsterCount(monsterCount + 1);
      setBlobState(2);
      setTimeout(() => setBlobState(0), 300);
      changeSprites();
      spawnMonster();
      if (potion === 1) {
        setExperience(experience + monsterZone * 2);
      } else {
        setExperience(experience + monsterZone);
      }
    }
  });
  return (
    <div className="monsterCount">
      {/* <span classname="bossSpan">Boss</span> */}
      {monsterZone % 10 === 0 && (
        <p className="timer"> {displayNumber(countdown)} seconds left</p>
      )}
      <p className="zoneCount">
        {displayNumber(monsterCount)}/{displayNumber(maxMonsterCount)} <br />
        Zone {displayNumber(monsterZone)}
      </p>
    </div>
  );
}
