import "../style/shop.css";

export default function Enchants({
  displayNumber,
  score,
  setScore,
  swords,
  setSwords,
  makeSwordDealDamage,
  intervalId,
  clearInterval,
  enchantsPrice,
  setEnchantsPrice
}) {
  const handleBuyEnchant = (selectedSword) => {
    if (score >= Math.round(enchantsPrice)) {
      setScore(score - Math.round(enchantsPrice));
      setEnchantsPrice(enchantsPrice * 1.2);
      const updatedSwords = swords.map((s) => {
        if (s.id === parseInt(selectedSword)) {
          s.enchant = Math.floor(Math.random() * 1000);
          if (s.enchant === 727) {
            alert("Legendary Enchant: WYSI! Damage of this sword +727%");
            if (s.equipped) {
              clearInterval(intervalId);
              makeSwordDealDamage({ ...s, damage: s.damage * 8.27 });
            }
            return { ...s, damage: s.damage * 8.27 };
          } else if (s.enchant <= 300) {
            alert("Common enchant: Damage of this sword +10%!");
            if (s.equipped) {
              clearInterval(intervalId);
              makeSwordDealDamage({ ...s, damage: s.damage * 1.1 });
            }
            return { ...s, damage: s.damage * 1.1 };
          } else if (s.enchant <= 600) {
            alert("Common enchant: Price of this sword -50%!");
            return { ...s, price: Math.round(s.price * 0.5) };
          } else if (s.enchant <= 900) {
            alert("Common enchant: Higher level cap for this sword!");
            return { ...s, levelCapMultiplier: Math.round(s.levelCapMultiplier * 1.3) };
          } else if (s.enchant <= 1000) {
            alert("Rare enchant: This sword generates gold while equipped!!");
            return { ...s, goldChance: Math.round(s.goldChance += 1) };
          }
        }
        return s;
      });
      setSwords(updatedSwords);
    }
  };

  const swordsToEnchant = swords.filter((s) => s.bought && s.enchant < 1)
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
          Enchant sword {displayNumber(enchantsPrice)}
        </button>
      )}

    </div>
  );
}
