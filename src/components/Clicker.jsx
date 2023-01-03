import { useState } from "react";
export default function Clicker({ setScore, score, setLife, life }) {
  const [clicker, setClicker] = useState(0);
  const [price, setPrice] = useState(10);
  const handleBuyClicker = () => {
    if (score >= Math.round(price)) {
      setScore(score - Math.round(price));
      setClicker(clicker + 1);
      setPrice(price * 1.2);
      setInterval(() => setLife((oldLife) => oldLife - 1), 1000);
    }
  };
  return (
    <>
      <p>You have {clicker} clickers</p>
      <button type="button" onClick={() => handleBuyClicker()}>
        Buy clicker : {Math.round(price)} points
      </button>
    </>
  );
}
