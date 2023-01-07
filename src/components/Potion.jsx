import { useState } from "react";

export default function Potion({ experience, setExperience }) {
  const [potion, setPotion] = useState(false);
  const [price, setPrice] = useState(100000);

  const buyPotion = () => {
    setPotion(true);
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
