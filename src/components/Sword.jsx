import "../style/shop.css";

export default function Sword({
  swords,
  setSwords,
  dealDps,
  level,
  score,
  setScore,
}) {
  const handleBuySword = (sword) => {
    let s = swords.find((s) => s.id === sword.id);
    if (score >= Math.round(sword.price) && s.level < level * 15) {
      setScore(score - Math.round(sword.price));
      let new_s = {
        ...s,
        price: Math.ceil(s.price * 1.07),
        bought: true,
        level: s.level + 1
      }
      if (s.equipped) {
        dealDps(-Math.round(s.damage * s.level) + Math.round(new_s.damage * new_s.level))
      }
      const updatedSwords = swords.map((s) => {
        if (s.id === sword.id) {
          return new_s
        }
        return s;
      });
      setSwords(updatedSwords);
    }
  };

  const handleEquipSword = (sword, equip) => {
    let doAction = false;
    let howManyEquipped = 0;
    if (!equip) {
      doAction = true;
    } else if (equip) {
      swords.forEach((s) => {
        if (s.equipped) {
          howManyEquipped++;
        }
      });
      if (howManyEquipped < 1) {
        doAction = true;
      }
    }
    if (doAction) {
      const updatedSwords = swords.map((s) => {
        if (s.id === sword.id) {
          return { ...s, equipped: equip };
        }
        return s;
      });
      if (equip) {
        dealDps(Math.round(sword.damage * sword.level))
      } else {
        let swordObject = swords.find((s) => s.id === sword.id)
        dealDps(-Math.round(swordObject.damage * swordObject.level))
      }
      setSwords(updatedSwords);
    }
  };

  return (swords.map((s) => {
    return (
      <div key={s.key} className="swordContainer">
        {s.bought === false && (
          <button
            className="swordButton"
            type="button"
            title={s.desc}
            onClick={() => handleBuySword(s)}
          >
            Buy {s.name}: {Math.round(s.price)} points
          </button>
        )}
        {s.bought === true && (
          <button
            className="swordButton"
            type="button"
            onClick={() => handleBuySword(s)}
          >
            Level up {s.name}: {Math.round(s.price)} points <br />
            currently level {s.level}
          </button>
        )}
        {s.bought === true && s.equipped === false && (
          <button
            type="button"
            onClick={() =>
              handleEquipSword(s, true)
            }
          >
            Equip
          </button>
        )}
        {s.equipped === true && (
          <button
            type="button"
            onClick={() => handleEquipSword(s, false)}
          >
            Unequip
          </button>
        )}
      </div>
    )
  }));
}
