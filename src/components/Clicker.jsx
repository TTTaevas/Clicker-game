import { useState } from "react";

export default function Clicker({ setScore, score }) {
  const [clicker, setClicker] = useState(0);
  const handleBuyClicker = () => {
    setScore(score - 10);
    setClicker(clicker + 1);
  };
  return (
    <>
      <p>You have {clicker} clickers</p>
      <button type="button" onClick={() => handleBuyClicker()}>
        Buy clicker : 10 points
      </button>
    </>
  );
}
