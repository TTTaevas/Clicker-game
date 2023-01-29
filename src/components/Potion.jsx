import { useState } from "react";
import "../style/shop.css";

export default function Potion({
  score,
  setScore,
  potion,
  setPotion,
  length,
  setLength,
  potionStyle,
  setPotionStyle,
}) {
  const [price, setPrice] = useState(250000);

  const buyPotion = () => {
    if (!potion && score >= price) {
      setScore(score - price);
      let countdown = setInterval(
        () => setLength((length) => length - 1),
        1000
      );
      setPotion(true);
      setPotionStyle("potionButtonBought");
      setTimeout(() => {
        setPotionStyle("potionButton");
        setPotion(false);
        clearInterval(countdown);
        setLength(length); // Because it's in timeout, length is the original value
      }, length * 1000);
    }
  };

  return (
    <>
      <button className={potionStyle} type="button" onClick={() => buyPotion()}>
        Buy XP potion: {Math.round(price)} points
      </button>
    </>
  );
}
