import "../style/shop.css";
import coinIcon from "../../assets/coin.png";
export default function Scrolls({
  displayNumber,
  scrolls,
  scrollUsageCooldown,
  setScrollUsageCooldown,
  handleBuyScroll,
  handleSellScroll,
  handleEquipScroll,
  handleScrollMouseOver,
  handleScrollMouseOut,
}) {
  const handleUseScrolls = (s) => {
    let cooldown_length = 900;
    let usage_length = 30;

    if (s.using <= 0 && s.used === false) {
      s.handleUse();
      s.used = true;
      setTimeout(() => {
        s.used = false;
      }, (cooldown_length + 1) * 1000);

      s.using = usage_length;
      let usage_timer = setInterval(() => {
        s.using--;
      }, 1000);
      setTimeout(() => {
        clearInterval(usage_timer);
      }, (usage_length + 1) * 1000);

      if (scrollUsageCooldown <= 0) {
        setScrollUsageCooldown(cooldown_length);
        let cooldown_timer = setInterval(() => {
          cooldown_length--;
          setScrollUsageCooldown(cooldown_length);
        }, 1000);
        setTimeout(() => {
          clearInterval(cooldown_timer);
        }, (cooldown_length + 1) * 1000);
      }
    }
  };
  return scrolls.map((s) => {
    return (
      <div
        className="scrollContainer"
        key={s.id}
        onMouseOver={() => {
          handleScrollMouseOver(s.id);
        }}
        onMouseOut={handleScrollMouseOut}
      >
        {s.bought === false && (
          <div className="scrolls">
            <button
              className="scrollButtons"
              type="button"
              onClick={() => handleBuyScroll(s)}
            >
              Buy : {displayNumber(s.price)}{" "}
              <img src={coinIcon} className="coinIcon" />
            </button>
            <p className="scrollsName">{s.name}</p>
          </div>
        )}
        {s.bought === true && (
          <div className="scrolls">
            <button
              className="scrollButtons"
              type="button"
              onClick={() => handleSellScroll(s)}
            >
              Sell : {displayNumber(s.price / 1.25)}{" "}
              <img src={coinIcon} className="coinIcon" />
            </button>
            <p className="scrollsName">{s.name}</p>
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
              <div className="scrollManager">
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
        {s.using > 0 && <p className="scrollTimer">{s.using}s</p>}
      </div>
    );
  });
}
