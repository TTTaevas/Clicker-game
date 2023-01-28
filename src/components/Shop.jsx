import { useState } from "react";
import Sword from "./Sword";
import Potion from "./Potion";
import Scrolls from "./Scrolls";
import Enchants from "./Enchants";
import swordIcon from "../../assets/sword.png";
import potionIcon from "../../assets/potion.png";
import scrollIcon from "../../assets/scroll.png";

export default function Shop({
  dps,
  dealDps,
  score,
  setScore,
  potion,
  setPotion,
  power,
  setPower,
  level,
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [potionStyle, setPotionStyle] = useState("potionButton");
  let [length, setLength] = useState(900);


  // Sword stats are NOT definitive
  let [swords, setSwords] = useState([{
    key: 1,
    id: 1,
    bought: false,
    equipped: false,
    level: 0,
    price: 10,
    damage: 1,
    name: "Wooden Sword",
    desc: `The Wooden Sword does 1 damage and cost 10. There is no enchants binded to it yet.`,
    enchant: 0,
  },
  {
    key: 2,
    id: 2,
    bought: false,
    equipped: false,
    level: 0,
    price: 100,
    damage: 3,
    name: "Stone Sword",
    desc: `The Stone Sword does 3 damage and cost 100. There is no enchants binded to it yet.`,
    enchant: 0,
  },
  {
    key: 3,
    id: 3,
    bought: false,
    equipped: false,
    level: 0,
    price: 375,
    damage: 10,
    name: "Iron Sword",
    desc: `The Iron Sword does 5 damage and cost 375. There is no enchants binded to it yet.`,
    enchant: 0,
  },
  {
    key: 4,
    id: 4,
    bought: false,
    equipped: false,
    level: 0,
    price: 1000,
    damage: 12,
    name: "Diamond Sword",
    desc: `The Diamond Sword does 12 damage and cost 1000. There is no enchants binded to it yet.`,
    enchant: 0,
  }])

  function getLengthInWrittenForm(length) {
    let minutes = 0;
    let seconds = 0;
    for (let i = length; i >= 60; i -= 60) {
      minutes++;
      length -= 60;
    }
    for (let i = 0; i < length; i++) {
      seconds++;
    }
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <>
      <div className="damage">
        {potion && (
          <p>
            The potion's effects will dissipate in:
            {getLengthInWrittenForm(length)}
          </p>
        )}
        <p className="score">score: {Math.round(score)}</p>
        <div className="dps">
          <p className="damagetext">{power} HP per click</p>
          <p className="damagetext">You inflict {Math.round(dps * (1 / 0.93) * 10) / 10} damage/second</p>
        </div>
      </div>
      <div
        className="tabs"
        onLoad={() => {
          // "resizeObserver" is to resize tabs at the same height as the shopContainer
          const resizeObserver = new ResizeObserver((entries) => {
            let height =
              document.getElementsByClassName("shopContainer")[0].clientHeight;
            document.getElementsByClassName("tabs")[0].style.bottom = `${
              height + 15
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
        <button className="tabButtons" onClick={() => setCurrentTab(3)}>
          <img src={scrollIcon} alt="scrolls icon" />
        </button>
      </div>
      <div className="shopContainer">
        <br />
        {currentTab === 0 && (
          <Sword
            swords={swords}
            setSwords={setSwords}
            dealDps={dealDps}
            level={level}
            score={score}
            setScore={setScore}
          />
        )}
        {currentTab === 1 && (
          <Potion
            score={score}
            setScore={setScore}
            potionStyle={potionStyle}
            setPotionStyle={setPotionStyle}
            length={length}
            setLength={setLength}
            potion={potion}
            setPotion={setPotion}
          />
        )}
        {currentTab === 2 && (
          <Scrolls
            dealDps={dealDps}
            power={power}
            setPower={setPower}
            score={score}
            setScore={setScore}
          />
          )}
        {currentTab === 3 && (
          <Enchants
            swords={swords}
            setSwords={setSwords}
            score={score}
            setScore={setScore}
          />
        )}
      </div>
    </>
  );
}
