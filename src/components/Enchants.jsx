import { useState } from "react";
import "../style/shop.css";

export default function Enchants({
  swords,
  setSwords,
  score,
  setScore
}) {
  const swordsToEnchant = swords.filter((s) => s.bought && s.enchant < 1);
  const [enchantsPrice, setEnchantsPrice] = useState(1000000);

  const handleBuyEnchant = (selectedSword) => {
    if (score >= Math.round(enchantsPrice)) {
      setScore(score - Math.round(enchantsPrice));
      setEnchantsPrice(enchantsPrice * 1.2);
      const updatedSwords = swords.map((s) => {
        if (s.id === parseInt(selectedSword)) {
          s.enchant = Math.floor(Math.random() * 1000);
        }
        if (s.enchant > 500) {
          if (s.equipped) {
            dealDps(-Math.round(s.damage) + Math.round(s.damage * 1.1))
          }
          return { ...s, damage: Math.round(s.damage * 1.1) };
        }
        if (s.enchant <= 500) {
          return { ...s, price: Math.round(s.price * 0.5) };
        }
        return s;
      });
      setSwords(updatedSwords);
    }
  };
  return (
    <div className="enchantsTab">
      <select className="selectSword">
        {swordsToEnchant.map(
          (sword) => (
            <option key={sword.id} value={sword.id}>
              {sword.name}
            </option>
          )
        )}
      </select>
      
      {swordsToEnchant.length > 0 && (
        <button
          className="enchantButtons"
          type="button"
          onClick={() => {
            handleBuyEnchant(document.getElementsByClassName("selectSword")[0].value)
          }}
        >
        Enchant sword {Math.round(enchantsPrice)}
        </button>
      )}

    </div>
  );
}
