import { useState } from "react";
import Sword from "./Sword";
import Potion from "./Potion";
import Scrolls from "./Scrolls";
import Enchants from "./Enchants";
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
  const [intervalId, setIntervalId] = useState(null);
  const [enchantsPrice, setEnchantsPrice] = useState(1000000);
  const [potionStyle, setPotionStyle] = useState("potionButton");
  let [length, setLength] = useState(900);
  // Swords stats are not definitive.

  const [swords, setSwords] = useState([
    {
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
      id: 2,
      bought: false,
      equipped: false,
      level: 0,
      price: 500,
      damage: 3,
      name: "Stone Sword",
      desc: `The Stone Sword does 3 damage and cost 500. There is no enchants binded to it yet.`,
      enchant: 0,
    },
    {
      id: 3,
      bought: false,
      equipped: false,
      level: 0,
      price: 2000,
      damage: 5,
      name: "Iron Sword",
      desc: `The Iron Sword does 5 damage and cost 2000. There is no enchants binded to it yet.`,
      enchant: 0,
    },
    {
      id: 4,
      bought: false,
      equipped: false,
      level: 0,
      price: 10000,
      damage: 10,
      name: "Diamond Sword",
      desc: `The Diamond Sword does 10 damage and cost 10000. There is no enchants binded to it yet.`,
      enchant: 0,
    },
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
      handleUse: () => {
        setPower((power = power * 2));
      },
    },
    {
      id: 3,
      bought: false,
      equipped: false,
      price: 8000,
      name: "Third Scroll",
    },
    {
      id: 4,
      bought: false,
      equipped: false,
      price: 15000,
      name: "Fourth Scroll",
    },
  ]);
  const handleBuyEnchant = (selectedSword) => {
    if (score >= Math.round(enchantsPrice)) {
      setScore(score - Math.round(enchantsPrice));
      setEnchantsPrice(enchantsPrice * 1.2);
      const updatedSwords = swords.map((s) => {
        if (s.id === parseInt(selectedSword)) {
          s.enchant = Math.floor(Math.random() * 1000);
        }
        if (s.enchant > 500) {
          return { ...s, damage: Math.round(s.damage * 1.1) };
        }
        if (s.enchant <= 500) {
          return { ...s, price: Math.round(s.price * 0.5) };
        }
        return s;
      });
      setSwords(updatedSwords);
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

  const makeSwordDealDamage = (sword) => {
    setIntervalId(
      setInterval(
        () => setLife((oldLife) => oldLife - sword.damage),
        (1000 / sword.level) * 0.93
      )
    );
  };
  const handleEquipSword = (sword, equip) => {
    let doAction = false;
    let howManyEquipped = 0;
    if (!equip) {
      doAction = true;
    } else if (equip) {
      swords.forEach((s) => {
        if (s.equipped) {
          howManyEquipped++;
        }
      });
      if (howManyEquipped < 1) {
        doAction = true;
      }
    }
    if (doAction) {
      const updatedSwords = swords.map((s) => {
        if (s.id === sword.id) {
          return { ...s, equipped: equip };
        }
        return s;
      });
      if (equip) {
        makeSwordDealDamage(sword);
      } else {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setSwords(updatedSwords);
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

  const handleBuySword = (sword) => {
    let s = swords.find((s) => s.id === sword.id);
    if (s.equipped) {
      clearInterval(intervalId);
      makeSwordDealDamage(s);
    }
    if (score >= Math.round(sword.price)) {
      setScore(score - Math.round(sword.price));
      const updatedSwords = swords.map((s) => {
        if (s.id === sword.id) {
          return {
            ...s,
            price: Math.ceil(s.price * 1.07),
            bought: true,
            level: s.level + 1,
          };
        }
        return s;
      });
      setSwords(updatedSwords);
    }
  };
  const inactiveDPS = swords.reduce(
    (acc, sword) => acc + sword.damage * sword.level,
    0
  );

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
        <p className="score">score : {Math.round(score)}</p>
        <div className="dps">
          <p className="damagetext">{power} HP per click</p>
          <p className="damagetext">You inflict {inactiveDPS} damage/second</p>
        </div>

        {potion && (
          <p>
            The potion's effects will dissipate in :
            {getLengthInWrittenForm(length)}
          </p>
        )}
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
        <button className="tabButtons" onClick={() => setCurrentTab(3)}>
          <img src={scrollIcon} alt="scrolls icon" />
        </button>
      </div>
      <div className="shopContainer">
        <br />
        {currentTab === 0 &&
          swords.map((sword) => (
            <Sword
              key={sword.id}
              id={sword.id}
              level={sword.level}
              price={sword.price}
              damage={sword.damage}
              bought={sword.bought}
              equipped={sword.equipped}
              name={sword.name}
              desc={sword.desc}
              handleBuySword={handleBuySword}
              handleEquipSword={handleEquipSword}
            />
          ))}
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
        {currentTab === 3 && (
          <Enchants
            swords={swords}
            setSwords={setSwords}
            enchantsPrice={enchantsPrice}
            handleBuyEnchant={handleBuyEnchant}
          />
        )}
      </div>
    </>
  );
}
