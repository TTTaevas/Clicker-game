import { useState } from "react";
export default function Scrolls({
  handleBuyScroll,
  handleSellScroll,
  handleEquipScroll,
  id,
  price,
  bought,
  equipped,
  name,
  handleUse,
}) {
  const [isScrollUsed, setIsScrollUsed] = useState(false);

  const handleUseScrolls = () => {
    if (isScrollUsed === false) {
      handleUse();
      setTimeout(setIsScrollUsed(), 3600000);
    }
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
            <button type="button" onClick={() => handleEquipScroll({ id, price, bought }, true)}>
              Equip
            </button>
          )}
          {equipped === true && (
            <div>
              <button type="button" onClick={() => handleEquipScroll({ id, price, bought }, false)}>
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
