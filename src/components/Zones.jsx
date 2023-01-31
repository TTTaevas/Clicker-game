import { useEffect, useState } from "react";
import "../style/zones.css";

export default function Zones({
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
}) {
  const [monsterCount, setMonsterCount] = useState(Number(localStorage.getItem("monsterCount")) || 1);
  const [countdown, setCountdown] = useState(Number(localStorage.getItem("countdown")) || 30);
  const [beforeBossLife, setBeforeBossLife] = useState(Number(localStorage.getItem("beforeBossLife")) || 0);

  useEffect(() => {localStorage.setItem("monsterCount", monsterCount)}, [monsterCount])
  useEffect(() => {localStorage.setItem("countdown", countdown)}, [countdown])
  useEffect(() => {localStorage.setItem("beforeBossLife", beforeBossLife)}, [beforeBossLife])

  const spawnMonster = () => {
    if (monsterCount === maxMonsterCount) {
      setMonsterCount(1);
      if ((monsterZone + 1) % 10 === 0) {
        setBeforeBossLife(maxLife);
        setMaxLife((maxLife = Math.round(monsterZone * 131.33)));
        setMaxMonsterCount(1);
        setMonsterZone(monsterZone + 1);
      } else {
        if (monsterZone % 10 === 0) {
          setMaxLife((maxLife = Math.round(maxLife * 0.3)));
        }
        setMaxLife((maxLife = Math.round(10 * (monsterZone * 1.66))));
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
        <p className="timer"> {countdown} seconds left</p>
      )}
      <p className="zoneCount">
        {monsterCount}/{maxMonsterCount} <br />
        Zone {monsterZone}
      </p>
    </div>
  );
}
