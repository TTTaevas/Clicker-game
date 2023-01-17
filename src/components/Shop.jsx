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
}) {
  const [currentTab, setCurrentTab] = useState(0);
  // Swords stats is not definitive.
  const [swords, setSwords] = useState([
    { id: 1, count: 0, price: 10, damage: 1, name: "Wooden Sword" },
    { id: 2, count: 0, price: 1000, damage: 5, name: "Stone Sword" },
    { id: 3, count: 0, price: 10000, damage: 10, name: "Iron Sword" },
    { id: 3, count: 0, price: 10000, damage: 10, name: "Iron Sword" },
    { id: 3, count: 0, price: 10000, damage: 10, name: "Iron Sword" },
    { id: 3, count: 0, price: 10000, damage: 10, name: "Iron Sword" },
    { id: 3, count: 0, price: 10000, damage: 10, name: "Iron Sword" },
    { id: 3, count: 0, price: 10000, damage: 10, name: "Iron Sword" },
    { id: 3, count: 0, price: 10000, damage: 10, name: "Iron Sword" },
  ]);

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
        {currentTab === 2 && <Scrolls />}
      </div>
    </>
  );
}
