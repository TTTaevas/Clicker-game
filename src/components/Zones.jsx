import { useEffect, useState } from "react";

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
      setMaxLife(maxLife = Math.round(maxLife * 1.2));
      setMonsterCount(0);
      setMonsterZone(Math.round(monsterZone * 11.2) / 10);
    }
    setLife((life = maxLife));
  }
  useEffect(() => {
    if (life <= 0) {
      setScore(score + monsterZone);
      setMonsterCount(monsterCount + 1);
      spawnMonster();
    }
  });
  return (
    <div>
      {monsterCount}/{maxMonsterCount}
    </div>
  );
}
