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
  changeSprites
}) {
  const [monsterCount, setMonsterCount] = useState(1);
  const [countdown, setCountdown] = useState(30);
  const [beforeBossLife, setBeforeBossLife] = useState(0);

  const spawnMonster = () => {
    if (monsterCount === maxMonsterCount) {
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
    }
    setLife((life = maxLife));
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
      setScore(Math.round(score + monsterZone * maxLife * 0.1));
      setMonsterCount(monsterCount + 1);
      setBlobState(2);
      setTimeout(() => setBlobState(0), 300);
      changeSprites();
      spawnMonster();
      if (potion) {
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
