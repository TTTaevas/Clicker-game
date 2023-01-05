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
  const [monsterCount, setMonsterCount] = useState(0);
  const [maxMonsterCount, setMaxMonsterCount] = useState(10);
  const spawnMonster = () => {
    if (monsterCount === maxMonsterCount - 1) {
      if (monsterZone % 9 === 0) {
        setMaxLife((maxLife = Math.round(maxLife * 60)));
        setMonsterCount(0);
        setMaxMonsterCount(1);
        setMonsterZone(monsterZone + 1);
      } else {
        if (monsterZone % 10 === 0) {
          setMaxLife((maxLife = Math.round(maxLife / 30)));
        }
        setMaxLife((maxLife = Math.round(maxLife * 1.8)));
        setMonsterCount(0);
        setMonsterZone(monsterZone + 1);
        setMaxMonsterCount(10);
      }
    }
    setLife((life = maxLife));
  };
  useEffect(() => {
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
    </div>
  );
}
