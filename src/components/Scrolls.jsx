import { useState } from "react";
export default function Scrolls({
  handleBuyScroll,
  handleSellScroll,
  id,
  price,
  name,
  bought,
  handleUse,
}) {
  let [equipped, setEquipped] = useState(false);

  const handleUseScrolls = () => {
    handleUse();
  };

  return (
    <div>
      {bought === false && (
        <button
          type="button"
          onClick={() => handleBuyScroll({ id, price, bought })}
        >
          Buy {name}: {Math.round(price)} points
        </button>
      )}
      {bought === true && (
        <div>
          <button
            type="button"
            onClick={() => handleSellScroll({ id, price, bought })}
          >
            Sell {name}: You will gain {Math.round(price) / 1.25} points
          </button>
          {equipped === false && (
            <button type="button" onClick={() => setEquipped(true)}>
              Equip
            </button>
          )}
          {equipped === true && (
            <div>
              <button type="button" onClick={() => setEquipped(false)}>
                Unequip
              </button>
              <button type="button" onClick={() => handleUseScrolls()}>
                Use
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
