import "../style/shop.css";

export default function Sword({
  id,
  price,
  damage,
  name,
  bought,
  equipped,
  handleBuySword,
  handleEquipSword,
  level,
}) {
  return (
    <div className="swordContainer">
      {bought === false && (
        <button
          className="swordButton"
          type="button"
          onClick={() => handleBuySword({ id, price })}
        >
          Buy {name}: {Math.round(price)} points
        </button>
      )}
      {bought === true && (
        <button
          className="swordButton"
          type="button"
          onClick={() => handleBuySword({ id, price, level })}
        >
          Level up {name}: {Math.round(price)} points <br />
          currently level {level}
        </button>
      )}
      {bought === true && equipped === false && (
        <button
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
          onClick={() => handleEquipSword({ id, price, bought, damage }, false)}
        >
          Unequip
        </button>
      )}
    </div>
  );
}
