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
  const [monsterCount, setMonsterCount] = useState(1);
  const [maxMonsterCount, setMaxMonsterCount] = useState(5);
  const [countdown, setCountdown] = useState(30);
  const [beforeBossLife, setBeforeBossLife] = useState(0);

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
    }
  });
  return (
    <div className="monsterCount">
      {monsterCount}/{maxMonsterCount} <br />
      Zone {monsterZone}
      {monsterZone % 10 === 0 && <p> {countdown} seconds left</p>}
    </div>
  );
}
