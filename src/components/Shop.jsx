import { useEffect, useState } from "react";
import Sword from "./Sword";
import Potion from "./Potion";
import Scrolls from "./Scrolls";
import Enchants from "./Enchants";
import SwordPopup from "./SwordPopup";
import ScrollPopup from "./ScrollPopup";
import swordIcon from "../../assets/sword.png";
import potionIcon from "../../assets/potion.png";
import scrollIcon from "../../assets/scroll.png";
import sparkIcon from "../../assets/spark.png";
import coinIcon from "../../assets/coin.png";

export default function Shop({
  displayNumber,
  score,
  setLife,
  life,
  setScore,
  potion,
  setPotion,
  power,
  setPower,
  level,
  cps,
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [enchantsPrice, setEnchantsPrice] = useState(1000000);
  const [potionStyle, setPotionStyle] = useState("potionButton");
  let [potionLength, setPotionlength] = useState(900);
  // Swords stats are not definitive.

  const [swords, setSwords] = useState([
    {
      id: 1,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 10,
      damage: 0.2,
      name: "Wooden Stick",
      desc: `A weird stick an old man sold you. It looks very fragile.`,
      goldChance: 0,
      enchant: 0,
    },
    {
      id: 2,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 300,
      damage: 0.6,
      name: "Stone Sword",
      desc: `Two rocks assembled on a stick. It's very cubic.`,
      goldChance: 0,
      enchant: 0,
    },
    {
      id: 3,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 1000,
      damage: 1.4,
      name: "Iron Sword",
      desc: `Forged by a blacksmith amateur. You'll have to deal with it.`,
      goldChance: 0,
      enchant: 0,
    },
    {
      id: 4,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 4000,
      damage: 2.4,
      name: "Gold Sword",
      desc: `For the rich people who likes to show their money.`,
      goldChance: 0,
      enchant: 0,
    },
    {
      id: 5,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 10000,
      damage: 4,
      name: "Diamond Sword",
      desc: `1 stick and 2 diamonds and you can finally craft it!`,
      goldChance: 0,
      enchant: 0,
    },
    {
      id: 6,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 20000,
      damage: 6,
      name: "Ruby Sword",
      desc: `Shines like blood. is it even made with Ruby?`,
      goldChance: 0,
      enchant: 0,
    },
    {
      id: 7,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 30000,
      damage: 8,
      name: "Topaz Sword",
      desc: `I don't know why it deals so much damage, it's just rocks.`,
      goldChance: 0,
      enchant: 0,
    },
    {
      id: 8,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 45000,
      damage: 11,
      name: "Sapphire Sword",
      desc: `Infused with magic, this sword shoots waves.`,
      goldChance: 0,
      enchant: 0,
    },
    {
      id: 9,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 10,
      price: 100000,
      damage: 15,
      name: "Titan Sword",
      desc: `You stole this sword from a mighty Titan. Well done.`,
      goldChance: 0,
      enchant: 0,
    },
  ]);
  const [scrollUsageCooldown, setScrollUsageCooldown] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverSwordId, setHoverSwordId] = useState(null);
  const [hoverScrollId, setHoverScrollId] = useState(null);
  const handleMouseOver = (id) => {
    setIsHovering(true);
    setHoverSwordId(id);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
    setHoverSwordId(null);
  };
  const handleScrollMouseOver = (id) => {
    setIsHovering(true);
    setHoverScrollId(id);
  };
  const handleScrollMouseOut = () => {
    setIsHovering(false);
    setHoverScrollId(null);
  };
  const [scrolls, setScrolls] = useState([
    {
      id: 1,
      bought: false,
      equipped: false,
      using: 0,
      used: false,
      price: 19999,
      name: "First Scroll",
      desc: "The power of this scroll is used to tap 10 times per second for 30 seconds.",
      condensedDesc: "(10 clicks/s)",
      handleUse: () => {
        const intervalId = setInterval(
          () => setLife((oldLife) => oldLife - power * 2),
          200
        );
        setTimeout(() => clearInterval(intervalId), 30000);
      },
    },
    {
      id: 2,
      bought: false,
      equipped: false,
      using: 0,
      used: false,
      price: 28888,
      name: "Second Scroll",
      desc: "The power of this scroll is used to double your power for 30 seconds.",
      condensedDesc: "(Power * 2)",
      handleUse: () => {
        setPower(power + level * 2);
        setTimeout(() => setPower(power + level), 30000);
      },
    },
    {
      id: 3,
      bought: false,
      equipped: false,
      using: 0,
      used: false,
      price: 37777,
      name: "Third Scroll",
      desc: "The power of this scroll is used to multiply your power by 4 for 30 seconds.",
      condensedDesc: "(Power * 4)",
      handleUse: () => {
        setPower(power + level * 4);
        setTimeout(() => setPower(power + level), 30000);
      },
    },
    {
      id: 4,
      bought: false,
      equipped: false,
      using: 0,
      used: false,
      price: 46666,
      name: "Fourth Scroll",
      desc: "The power of this scroll is used to tap 10 times per second for 30 seconds but with your power multiplied by 3.",
      condensedDesc: "(10 clicks/s, power * 3)",
      handleUse: () => {
        const intervalId = setInterval(
          () => setLife((oldLife) => oldLife - power * level * 6),
          200
        );
        setTimeout(() => clearInterval(intervalId), 30000);
      },
    },
  ]);
  const HandleHelpScrolls = () => {
    alert(
      "Scrolls are buyable 'skills' you can use one time each 15 minutes. You can only equip 3 or less but be careful! if you use one scroll, you will not be able to Unequip or equip other scrolls. Each scrolls basic duration is 30 seconds. If you have more than 1 scroll equipped and you decide to use only one, you will be able to use others later on. Enjoy using them!"
    );
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
    if (scrollUsageCooldown > 0 || scroll.using > 0) return;
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
      setInterval(() => {
        setLife((oldLife) => oldLife - sword.damage * sword.level);
      }, 200)
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
    if ((!scroll.equipped || scrollUsageCooldown <= 0) && scroll.using <= 0) {
      setScore(score + Math.round(scroll.price) / 1.25);
      const updatedScrolls = scrolls.map((s) => {
        if (s.id === scroll.id) {
          return { ...s, equipped: false, bought: false };
        }
        return s;
      });
      setScrolls(updatedScrolls);
    }
  };

  const handleBuySword = (sword) => {
    let s = swords.find((s) => s.id === sword.id);
    if (s.equipped) {
      clearInterval(intervalId);
      makeSwordDealDamage(s);
    }
    if (score >= Math.round(sword.price)) {
      const updatedSwords = swords.map((s) => {
        if (s.id === sword.id && s.level < level * s.levelCapMultiplier) {
          setScore(score - Math.round(sword.price));
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
  const inactiveDPS = swords
    .filter((s) => s.equipped)
    .reduce(
      (acc, sword) => acc + Math.round(sword.damage * (sword.level * 5)),
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

  useEffect(() => {
    let sword = swords.find((s) => s.equipped);
    if (sword && sword.goldChance > Math.floor(Math.random() * 100)) {
      setScore(score + sword.price / 3);
    }
  }, [life]);

  return (
    <>
      <div className="information">
        <div className="informationleft">
          <p className="score">
            You have: {displayNumber(score)} gold{" "}
            <img className="coinIcon" src={coinIcon} />
          </p>
          {scrollUsageCooldown > 0 && (
            <p>
              Scrolls Cooldown: {getLengthInWrittenForm(scrollUsageCooldown)}
            </p>
          )}
        </div>
        <div className="informationright">
          <p className="cps">{displayNumber(cps)} click per second</p>
          <p className="damagetext">{displayNumber(power * (potion === 3 ? 2 : 1))} HP per click</p>
          <p className="damagetext">
            You inflict {displayNumber(inactiveDPS)} damage/second
          </p>
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
              height + 13
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
          <img src={sparkIcon} alt="scrolls icon" />
        </button>
      </div>
      <div className="shopContainer">
        <br />
        {currentTab === 0 && (
          <Sword
            displayNumber={displayNumber}
            swords={swords}
            handleBuySword={handleBuySword}
            handleEquipSword={handleEquipSword}
            handleMouseOver={handleMouseOver}
            handleMouseOut={handleMouseOut}
          />
        )}
        {isHovering &&
          hoverSwordId &&
          swords.map((sword) => {
            if (sword.id === hoverSwordId) {
              return (
                <SwordPopup
                  className="popup"
                  damage={sword.damage}
                  price={sword.price}
                  level={sword.level}
                  bought={sword.bought}
                  desc={sword.desc}
                  equipped={sword.equipped}
                />
              );
            }
          })}
        {currentTab === 1 && potion !== 0 && (
          <p>
            The potion's effects will dissipate in: {getLengthInWrittenForm(potionLength)}
          </p>
        )}
        {currentTab === 1 && (
          <Potion
            displayNumber={displayNumber}
            score={score}
            setScore={setScore}
            potionStyle={potionStyle}
            setPotionStyle={setPotionStyle}
            length={potionLength}
            setLength={setPotionlength}
            potion={potion}
            setPotion={setPotion}
          />
        )}
        {currentTab === 2 && (
          <>
            <button
              onClick={() => HandleHelpScrolls()}
              type="button"
              className="infoScrolls"
            >
              Help
            </button>
            <Scrolls
              scrolls={scrolls}
              displayNumber={displayNumber}
              scrollUsageCooldown={scrollUsageCooldown}
              setScrollUsageCooldown={setScrollUsageCooldown}
              handleBuyScroll={handleBuyScroll}
              handleSellScroll={handleSellScroll}
              handleEquipScroll={handleEquipScroll}
              handleScrollMouseOver={handleScrollMouseOver}
              handleScrollMouseOut={handleScrollMouseOut}
            />
          </>
        )}
        {isHovering &&
          hoverScrollId &&
          scrolls.map((scroll) => {
            if (scroll.id === hoverScrollId) {
              return (
                <ScrollPopup
                  className="popup"
                  used={scroll.used}
                  using={scroll.using}
                  bought={scroll.bought}
                  desc={scroll.desc}
                  condensedDesc={scroll.condensedDesc}
                  equipped={scroll.equipped}
                />
              );
            }
          })}
        {currentTab === 3 && (
          <Enchants
            displayNumber={displayNumber}
            score={score}
            setScore={setScore}
            swords={swords}
            setSwords={setSwords}
            makeSwordDealDamage={makeSwordDealDamage}
            intervalId={intervalId}
            clearInterval={clearInterval}
            enchantsPrice={enchantsPrice}
            setEnchantsPrice={setEnchantsPrice}
          />
        )}
      </div>
    </>
  );
}
