import { useState } from "react";
import "../style/shop.css";

export default function Scrolls({
  dealDps,
  power,
  score,
  setScore,
}) {
  let [scrolls, setScrolls] = useState([
    {
      key: 1,
      id: 1,
      bought: false,
      equipped: false,
      price: 1000,
      name: "First Scroll",
      handleUse: () => {
        dealDps(power)
        setTimeout(() => dealDps(-power), 30000);
      },
    },
    {
      key: 2,
      id: 2,
      bought: false,
      equipped: false,
      price: 5000,
      name: "Second Scroll",
      handleUse: () => {
        setPower((power = power * 2));
      },
    },
    {
      key: 3,
      id: 3,
      bought: false,
      equipped: false,
      price: 8000,
      name: "Third Scroll",
    },
    {
      key: 4,
      id: 4,
      bought: false,
      equipped: false,
      price: 15000,
      name: "Fourth Scroll",
    },
  ]);
  
  const [isScrollUsed, setIsScrollUsed] = useState(false);
  const handleUseScrolls = (scroll) => {
    if (isScrollUsed === false) {
      scroll.handleUse();
      setTimeout(setIsScrollUsed(), 3600000);
    }
  };

  const handleBuyScroll = (scroll) => {
    if (score >= Math.round(scroll.price)) {
      setScore(score - Math.round(scroll.price));
      const updatedScrolls = scrolls.map((s) => {
        if (s.id === scroll.id) {
          return { ...s, bought: true };
        }
        return s;
      });
      setScrolls(updatedScrolls);
    }
  };
  const handleSellScroll = (scroll) => {
    setScore(score + Math.round(scroll.price) / 1.25);
    const updatedScrolls = scrolls.map((s) => {
      if (s.id === scroll.id) {
        return { ...s, equipped: false, bought: false };
      }
      return s;
    });
    setScrolls(updatedScrolls);
  };
  const handleEquipScroll = (scroll, equip) => {
    let doAction = false;
    if (!equip) {
      doAction = true;
    } else if (equip) {
      let howManyEquipped = 0;
      scrolls.forEach((s) => {
        if (s.equipped) {
          howManyEquipped++;
        }
      });
      if (howManyEquipped < 3) {
        doAction = true;
      }
    }
    if (doAction) {
      const updatedScrolls = scrolls.map((s) => {
        if (s.id === scroll.id) {
          return { ...s, equipped: equip };
        }
        return s;
      });
      setScrolls(updatedScrolls);
    }
  };

  return (scrolls.map((s) => {
    return (
    <div key={s.key}>
      {s.bought === false && (
        <button
          className="scrollButtons"
          type="button"
          onClick={() => handleBuyScroll(s)}
        >
          Buy {s.name}: {Math.round(s.price)} points
        </button>
      )}
      {s.bought === true && (
        <div>
          <button
            className="scrollButtons"
            type="button"
            onClick={() => handleSellScroll(s)}
          >
            Sell {s.name}: You will gain {Math.round(s.price) / 1.25} points
          </button>
          {s.equipped === false && (
            <button
              type="button"
              onClick={() => handleEquipScroll(s, true)}
            >
              Equip
            </button>
          )}
          {s.equipped === true && (
            <div>
              <button
                type="button"
                onClick={() => handleEquipScroll(s, false)}
              >
                Unequip
              </button>
              <button type="button" onClick={() => handleUseScrolls(s)}>
                Use
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    )
  }));
}
