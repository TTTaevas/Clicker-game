import { useState } from "react";
import "../style/shop.css";
export default function Sword({ setScore, score, setLife }) {
  const [sword, setSword] = useState(0);
  const [price, setPrice] = useState(10);
  const handleBuySword = () => {
    if (score >= Math.round(price)) {
      setScore(score - Math.round(price));
      setSword(sword + 1);
      setPrice(price * 1.2);
      setInterval(() => setLife((oldLife) => oldLife - 1), 1000);
    }
  };
  return (
    <>
      <p>You have {sword} swords</p>
      <button className="sword" type="button" onClick={() => handleBuySword()}>
        Buy sword : {Math.round(price)} points
      </button>
    </>
  );
}
