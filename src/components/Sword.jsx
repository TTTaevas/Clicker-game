import "../style/shop.css";
import coinIcon from "../../assets/coin.png";
export default function Sword({
  displayNumber,
  swords,
  handleBuySword,
  handleEquipSword,
  handleMouseOver,
  handleMouseOut,
}) {
  return (swords.map((s) => {
    return (
      <div
        className="swordContainer"
        key={s.id}
        onMouseOver={() => {handleMouseOver(s.id)}}
        onMouseOut={handleMouseOut}
      >
        {s.bought === false && (
          <div className="swordsButtonsAndText">
            <button
              className="swordButton"
              type="button"
                title={s.desc}
                onClick={() => handleBuySword(s)}
              >
              Level: {s.level} <br />
              Buy: {displayNumber(s.price)}
              <img className="coinIcon" src={coinIcon} />
            </button>
            <p>{s.name}</p>
          </div>
        )}
        {s.bought === true && (
          <div className="swordsButtonsAndText">
            <button
              className="swordButton"
              type="button"
              title={s.desc}
              onClick={() => handleBuySword(s)}
            >
              Level: {displayNumber(s.level)} <br />
              Level up: {displayNumber(s.price)}
              <img className="coinIcon" src={coinIcon} />
            </button>
            <p>
              {s.name} / DPS: {Math.round(s.damage * 5 * s.level)}
            </p>
          </div>
        )}
        {s.bought === true && s.equipped === false && (
          <button
            className="EquipButton"
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
            className="EquipButton"
            onClick={() => handleEquipSword(s, false)}
          >
            Unequip
          </button>
        )}
      </div>
    )
  }));
}
