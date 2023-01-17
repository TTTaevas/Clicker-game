import { useState } from "react";
import Sword from "./Sword";
import Potion from "./Potion";
import Scrolls from "./Scrolls";
import swordIcon from "../../assets/sword.png";
import potionIcon from "../../assets/potion.png";
import scrollIcon from "../../assets/scroll.png";

export default function Shop({
  score,
  setLife,
  setScore,
  potion,
  setPotion,
  power,
  setPower,
}) {
  const [currentTab, setCurrentTab] = useState(0);
  // Swords stats is not definitive.
  const [swords, setSwords] = useState([
    { id: 1, count: 0, price: 10, damage: 1, name: "Wooden Sword" },
    { id: 2, count: 0, price: 1000, damage: 5, name: "Stone Sword" },
    { id: 3, count: 0, price: 10000, damage: 10, name: "Iron Sword" },
    { id: 4, count: 0, price: 100000, damage: 100, name: "Diamond Sword" },
  ]);

  const [scrolls, setScrolls] = useState([
    {
      id: 1,
      bought: false,
      equipped: false,
      price: 1000,
      name: "First Scroll",
      handleUse: () => {
        const intervalId = setInterval(
          () => setLife((oldLife) => oldLife - power),
          100
        );
        setTimeout(() => clearInterval(intervalId), 30000);
      },
    },
    {
      id: 2,
      bought: false,
      equipped: false,
      price: 5000,
      name: "Second Scroll",
      handleUse: () => {setPower(power * 200)},
    },
    { id: 3, bought: false, equipped: false, price: 8000, name: "Third Scroll" },
    { id: 4, bought: false, equipped: false, price: 15000, name: "Fourth Scroll" },
  ]);
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
  const handleEquipScroll = (scroll, equip) => {
    let doAction = false;
    if (!equip) {
      doAction = true;
    } else if (equip) {
      let how_many_equipped = 0;
      scrolls.forEach((s) => {
        if (s.equipped) {
          how_many_equipped++;
        }
      })
      if (how_many_equipped < 3) {
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
  }
  const handleSellScroll = (scroll) => {
    setScore(score + Math.round(scroll.price) / 1.25);
    const updatedScrolls = scrolls.map((s) => {
      if (s.id === scroll.id) {
        return { ...s, bought: false };
      }
      return s;
    });
    setScrolls(updatedScrolls);
  };

  const handleBuySword = (sword) => {
    if (score >= Math.round(sword.price)) {
      setScore(score - Math.round(sword.price));
      const updatedSwords = swords.map((s) => {
        if (s.id === sword.id) {
          return { ...s, price: s.price * 1.2, count: s.count + 1 };
        }
        return s;
      });
      setSwords(updatedSwords);
      setInterval(() => setLife((oldLife) => oldLife - sword.damage), 1000);
    }
  };
  const inactiveDPS = swords.reduce(
    (acc, sword) => acc + sword.damage * sword.count,
    0
  );

  return (
    <>
      <div className="damage">
        <p>{power} HP per click</p>
        <p>You inflict {inactiveDPS} damage/second</p>
      </div>
      <div
        className="tabs"
        onLoad={() => {
          // "resizeObserver" is to resize tabs at the same height as the shopContainer
          const resizeObserver = new ResizeObserver((entries) => {
            let height =
              document.getElementsByClassName("shopContainer")[0].clientHeight;
            document.getElementsByClassName("tabs")[0].style.bottom = `${
              height + 2
            }px`;
          });
          resizeObserver.observe(
            document.getElementsByClassName("shopContainer")[0]
          );
        }}
      >
        <button className="tabButtons" onClick={() => setCurrentTab(0)}>
          <img src={swordIcon} alt="sword icon" />
        </button>
        <button className="tabButtons" onClick={() => setCurrentTab(1)}>
          <img src={potionIcon} alt="potion icon" />
        </button>
        <button className="tabButtons" onClick={() => setCurrentTab(2)}>
          <img src={scrollIcon} alt="scrolls icon" />
        </button>
      </div>
      <div className="shopContainer">
        <br />
        {currentTab === 0 &&
          swords.map((sword) => (
            <Sword
              count={sword.count}
              key={sword.id}
              id={sword.id}
              price={sword.price}
              damage={sword.damage}
              name={sword.name}
              handleBuySword={handleBuySword}
            />
          ))}
        {currentTab === 1 && <Potion potion={potion} setPotion={setPotion} />}
        {currentTab === 2 &&
          scrolls.map((scrolls) => (
            <Scrolls
              key={scrolls.id}
              name={scrolls.name}
              id={scrolls.id}
              price={scrolls.price}
              bought={scrolls.bought}
              equipped={scrolls.equipped}
              handleBuyScroll={handleBuyScroll}
              handleSellScroll={handleSellScroll}
              handleEquipScroll={handleEquipScroll}
              handleUse={scrolls.handleUse}
            />
          ))}
      </div>
    </>
  );
}
