import "../style/shop.css";

export default function Sword({
  id,
  count,
  price,
  damage,
  name,
  handleBuySword,
}) {
  return (
    <div className="swordContainer">
      <button
        className="swordButton"
        type="button"
        onClick={() => handleBuySword({ id, price, damage, name })}
      >
        Buy {name}: {Math.round(price)} points
      </button>
      <p>
        You have {count} {name}s
      </p>
    </div>
  );
}
