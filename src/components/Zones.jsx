import { useEffect, useState } from "react";

export default function Zones({
  life,
  maxLife,
  setMaxLife,
  monsterZone,
  setMonsterZone,
}) {
  const [monsterCount, setMonsterCount] = useState(0);
  const [maxMonsterCount, setMaxMonsterCount] = useState(10);
  useEffect(() => {
    if (life <= 0) {
      setMonsterCount(monsterCount + 1);
    }
    if (maxMonsterCount === monsterCount) {
      setMaxLife(Math.round(maxLife * 1.2));
      setMonsterCount(0);
      setMonsterZone(Math.round(monsterZone * 11.2) / 10);
    }
  });
  return (
    <div>
      {monsterCount}/{maxMonsterCount}
    </div>
  );
}
