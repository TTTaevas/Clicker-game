import { useState } from "react";
import increment from "../../utils/utils";
export default function Clicker({ setScore, score }) {
  const [clicker, setClicker] = useState(0);

  const handleBuyClicker = () => {
    if (score >= 10) {
      setScore(score - 10);
      setClicker(clicker + 1);
      setInterval(() => setScore((oldScore) => oldScore + 1), 1000);
    }
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
