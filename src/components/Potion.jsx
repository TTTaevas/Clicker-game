import { useState } from "react";

export default function Potion({
  potion,
  setPotion,
  experience,
  setExperience,
}) {
  const [price, setPrice] = useState(100000);

  const buyPotion = () => {
    setPotion(true);
    setTimeout(() => {
      setPotion(false);
    }, 15 * 60 * 1000);
  };

  return (
    <>
      {potion && <p>You currently are under effect of a potion!</p>}
      <button type="button" onClick={() => buyPotion()}>
        Buy potion : {Math.round(price)} points
      </button>
    </>
  );
}
