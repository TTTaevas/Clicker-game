import { useState, useEffect } from "react";
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
  experience,
  setExperience,
  level,
  cps,
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [enchantsPrice, setEnchantsPrice] = useState(1000000);
  const [potionStyle, setPotionStyle] = useState("potionButton");
  let [potionLength, setPotionlength] = useState(900);
  // Swords stats are not definitive.

  const [swords, setSwords] = useState(JSON.parse(localStorage.getItem("swords")) || [
    {
      id: 1,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 10,
      damage: 0.2,
      name: "Wooden Stick",
      desc: `A weird stick an old man sold you. It looks very fragile.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 2,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 300,
      damage: 0.6,
      name: "Stone Sword",
      desc: `Two rocks assembled on a stick. It's very cubic.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 3,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 1000,
      damage: 1.4,
      name: "Iron Sword",
      desc: `Forged by a blacksmith amateur. You'll have to deal with it.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 4,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 4000,
      damage: 2.4,
      name: "Gold Sword",
      desc: `For the rich people who likes to show their money.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 5,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 10000,
      damage: 4,
      name: "Diamond Sword",
      desc: `1 stick and 2 diamonds and you can finally craft it!`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 6,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 20000,
      damage: 6,
      name: "Ruby Sword",
      desc: `Shines like blood. is it even made with Ruby?`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 7,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 30000,
      damage: 8,
      name: "Fire Sword",
      desc: `A magical sword made of fire. Useful to cook some skeletons.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 8,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 35000,
      damage: 11,
      name: "Sapphire Sword",
      desc: `Infused with magic, this sword shoots waves.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 9,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 45000,
      damage: 11,
      name: "Ice Sword",
      desc: `A magical sword made of ice. Shatter your foes to pieces!`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 10,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 65000,
      damage: 14,
      name: "Sharp Sword",
      desc: `Really cool-looking, but its blade is so edgy it renders any sheath useless...`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 11,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 80000,
      damage: 16,
      name: "Sapphire Sword",
      desc: `Infused with magic, this sword shoots waves.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 12,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 110000,
      damage: 20,
      name: "Invisible Sword",
      desc: `This magical sword is only visible to its holder.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 13,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 140000,
      damage: 24,
      name: "Titan Sword",
      desc: `You stole this sword from a mighty Titan. Well done.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 14,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 190000,
      damage: 30,
      name: "Legendary Sword",
      desc: `It was rumoured to be hidden in the Dark Forest's depths, and it turns out those rumours were accurate.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 15,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 240000,
      damage: 36,
      name: "Spectral Sword",
      desc: `A ghostly opponent attempted to slay you with this strange sword, but now it's your time to slay with it.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 16,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 300000,
      damage: 44,
      name: "King's Gift",
      desc: `You've successfully defended a kingdom from an army of skeletons, your heroism did not go unrewarded.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 17,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 360000,
      damage: 53,
      name: "Earth Slayer",
      desc: `Said to have been sent from the skies to Earth, thereby scarring the planet.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 18,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 450000,
      damage: 66,
      name: "Dwarves' Gem",
      desc: `Forged by the best forgers in the deepest depths of the planet with the best materials.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 19,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 620000,
      damage: 90,
      name: "The Gods' Demise",
      desc: `Specifically created to end the rule of the Gods, once and for all.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
    {
      id: 20,
      bought: false,
      equipped: false,
      level: 0,
      levelCapMultiplier: 5,
      price: 1000000,
      damage: 250,
      name: "Void Blade",
      desc: `It has the power of a black hole, directly forged from Andromeda.`,
      goldChance: 0,
      experienceChance: 0,
      damageChance: 0,
      levelUpChance: 0,
      priceChance: 0,
      enchant: 0,
    },
  ]);
  const [scrolls, setScrolls] = useState(JSON.parse(localStorage.getItem("scrolls")) || [
    {
      id: 1,
      bought: false,
      equipped: false,
      using: 0,
      used: false,
      price: 199999,
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
      price: 288888,
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
      price: 377777,
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
      price: 466666,
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
  const HandleHelpScrolls = () => {
    alert(
      "Scrolls are buyable 'skills' you can use one time each 15 minutes. You can only equip 3 or less but be careful! if you use one scroll, you will not be able to Unequip or equip other scrolls. Each scrolls basic duration is 30 seconds. If you have more than 1 scroll equipped and you decide to use only one, you will be able to use others later on. Enjoy using them!"
    );
  };

  useEffect(() => {localStorage.setItem("swords", JSON.stringify(swords.map((s) => {return {...s, equipped: false}}))), [swords]})
  useEffect(() => {localStorage.setItem("scrolls", JSON.stringify(scrolls.map((s) => {return {...s, equipped: false}}))), [scrolls]})

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
    if (sword && sword.experienceChance > Math.floor(Math.random() * 100)) {
      setExperience(experience + inactiveDPS);
    }
    if (sword && sword.damageChance > Math.floor(Math.random() * 100)) {
      sword.damage += sword.damage / 8;
    }
    if (sword && sword.levelUpChance > Math.floor(Math.random() * 100)) {
      sword.level++;
      sword.price = Math.ceil(sword.price * 1.07);
    }
    if (sword && sword.priceChance > Math.floor(Math.random() * 100)) {
      sword.price = Math.ceil(sword.price * 0.9);
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
          {potion !== 0 && (
            <p>
              The potion's effects will dissipate in:{" "}
              {getLengthInWrittenForm(potionLength)}
            </p>
          )}
        </div>
        <div className="informationright">
          <p className="cps">{displayNumber(cps)} click per second</p>
          <p className="damagetext">
            {displayNumber(power * (potion === 3 ? 2 : 1))} HP per click
          </p>
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
        {level >= 5 && (
          <button className="tabButtons" onClick={() => setCurrentTab(1)}>
            <img src={potionIcon} alt="potion icon" />
          </button>
        )}
        {level >= 10 && (
          <button className="tabButtons" onClick={() => setCurrentTab(2)}>
            <img src={scrollIcon} alt="scrolls icon" />
          </button>
        )}
        {level >= 20 && (
          <button className="tabButtons" onClick={() => setCurrentTab(3)}>
            <img src={sparkIcon} alt="scrolls icon" />
          </button>
        )}
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
