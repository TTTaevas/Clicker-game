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
}) {
  const [maxSecondsToKillBoss, setMaxSecondsToKillBoss] = useState(30);
  const [monsterCount, setMonsterCount] = useState(1);
  const [maxMonsterCount, setMaxMonsterCount] = useState(10);
  const [countdown, setCountdown] = useState(maxSecondsToKillBoss);
  const [beforeBossLife, setBeforeBossLife] = useState(0);

  const spawnMonster = () => {
    if (monsterCount === maxMonsterCount) {
      setMonsterCount(1);
      if (monsterZone % 9 === 0) {
        setBeforeBossLife(maxLife);
        setMaxLife((maxLife = Math.round(maxLife * 10)));
        setMaxMonsterCount(1);
        setMonsterZone(monsterZone + 1);
      } else {
        if (monsterZone % 10 === 0) {
          setMaxLife((maxLife = Math.round(maxLife / 30)));
        }
        setMaxLife((maxLife = Math.round(maxLife * 1.8)));
        setMonsterZone(monsterZone + 1);
        setMaxMonsterCount(10);
      }
    }
    setLife((life = maxLife));
  };
  useEffect(() => {
    if (
      monsterZone % 10 === 0 &&
      countdown === maxSecondsToKillBoss &&
      life === maxLife
    ) {
      for (let i = 0; i < maxSecondsToKillBoss; i++) {
        setTimeout(() => {
          setCountdown(countdown - (i + 1));
        }, 1000 * (i + 1));
      }
    }
    if (countdown <= 0 && monsterZone % 10 === 0) {
      // If still against the boss when timer is done
      setMaxLife(beforeBossLife);
      setLife(beforeBossLife);
      setCountdown(maxSecondsToKillBoss);
      setMonsterZone(monsterZone - 1);
      setMaxMonsterCount(10);
    }
    if (life <= 0) {
      setScore(score + maxLife / 6);
      setMonsterCount(monsterCount + 1);
      spawnMonster();
    }
  });
  return (
    <div className="monsterCount">
      {monsterCount}/{maxMonsterCount} <br />
      You are in zone {monsterZone}
      {monsterZone % 10 === 0 && <p> {countdown} seconds left</p>}
    </div>
  );
}
