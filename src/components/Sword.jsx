import "../style/shop.css";
import coinIcon from "../../assets/coin.png";

export default function Sword({
  displayNumber,
  id,
  price,
  damage,
  name,
  bought,
  equipped,
  handleBuySword,
  handleEquipSword,
  level,
  desc,
}) {
  return (
    <div className="swordContainer">
      {bought === false && (
        <div className="swordsButtonsAndText">
          <button
            className="swordButton"
            type="button"
            title={desc}
            onClick={() => handleBuySword({ id, price })}
          >
            Level : {level} <br />
            Buy : {displayNumber(price)}
            <img className="coinIcon" src={coinIcon} />
          </button>
          <p>{name}</p>
        </div>
      )}
      {bought === true && (
        <div className="swordsButtonsAndText">
          <button
            className="swordButton"
            type="button"
            title={desc}
            onClick={() => handleBuySword({ id, price })}
          >
            Level : {displayNumber(level)} <br />
            Level up : {displayNumber(price)}
            <img className="coinIcon" src={coinIcon} />
          </button>
          <p>
            {name} / DPS : {Math.round(damage * 5)}
          </p>
        </div>
      )}
      {bought === true && equipped === false && (
        <button
          className="EquipButton"
          type="button"
          onClick={() =>
            handleEquipSword({ id, price, bought, damage, level }, true)
          }
        >
          Equip
        </button>
      )}
      {equipped === true && (
        <button
          type="button"
          className="EquipButton"
          onClick={() => handleEquipSword({ id, price, bought, damage }, false)}
        >
          Unequip
        </button>
      )}
    </div>
  );
}
