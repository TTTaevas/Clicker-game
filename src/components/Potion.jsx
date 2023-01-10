import { useState } from "react";
import "../style/shop.css";

export default function Potion({ potion, setPotion }) {
  const [potionStyle, setPotionStyle] = useState("potionButton");
  const [price, setPrice] = useState(100000);
  let [length, setLength] = useState(900);

  const buyPotion = () => {
    if (!potion) {
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
      {potion && (
        <p>
          The potion's effects will dissipate in{" "}
          {getLengthInWrittenForm(length)}
        </p>
      )}
      <button className={potionStyle} type="button" onClick={() => buyPotion()}>
        Buy XP potion: {Math.round(price)} points
      </button>
    </>
  );
}

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
