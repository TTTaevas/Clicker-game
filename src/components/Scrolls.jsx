import "../style/shop.css";
export default function Scrolls({
  displayNumber,
  scrolls,
  scrollUsageOnCooldown,
  setScrollUsageOnCooldown,
  handleBuyScroll,
  handleSellScroll,
  handleEquipScroll,
}) {
  const handleUseScrolls = (s) => {
    if (scrollUsageOnCooldown === false) {
      s.handleUse();
      setTimeout(setScrollUsageOnCooldown(), 900000);
      
      let usage_length = 30
      s.using = usage_length
      let timer = setInterval(() => {s.using--}, 1000)
      setTimeout(() => {clearInterval(timer)}, (usage_length + 1) * 1000)
    }
  };
  return (scrolls.map((s) => {
    return (
      <div className="scrollContainer" key={s.id}>
        {s.bought === false && (
          <button
            className="scrollButtons"
            type="button"
            onClick={() => handleBuyScroll(s)}
          >
            Buy {s.name}: {displayNumber(s.price)} points
          </button>
        )}
        {s.bought === true && (
          <div>
            <button
              className="scrollButtons"
              type="button"
              onClick={() => handleSellScroll(s)}
            >
              Sell {s.name}: You will gain {displayNumber(s.price / 1.25)} points
            </button>
            {s.equipped === false && (
              <button
                className="EquipButton"
                type="button"
                onClick={() => handleEquipScroll(s, true)}
              >
                Equip
              </button>
            )}
            {s.equipped === true && (
              <div>
                <button
                  className="EquipButton"
                  type="button"
                  onClick={() => handleEquipScroll(s, false)}
                >
                  Unequip
                </button>
                <button
                  className="EquipButton"
                  type="button"
                  onClick={() => handleUseScrolls(s)}
                >
                  Use
                </button>
              </div>
            )}
          </div>
        )}
        {s.using > 0 && (
          <p className="scrollTimer">{s.using}s</p>
        )}
      </div>
    )
  }));
}
