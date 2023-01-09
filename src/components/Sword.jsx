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
    <>
      <p>
        You have {count} {name}
      </p>
      <button
        className="sword"
        type="button"
        onClick={() => handleBuySword({ id, price, damage, name })}
      >
        Buy {name}: {Math.round(price)} points
      </button>
    </>
  );
}
