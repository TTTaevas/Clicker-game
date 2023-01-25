import "../style/shop.css";

export default function Enchants({
  swordId,
  swordDamage,
  swordEnchant,
  enchantsPrice,
  handleBuyEnchant,
  swords,
  selectedSword,
  setSelectedSword,
}) {
  return (
    <div className="enchantsTab">
      <select
        value={selectedSword}
        onChange={(e) => setSelectedSword(e.target.value)}
      >
        {swords.map(
          (sword) =>
            sword.bought === true && (
              <option key={sword.id} value={sword.id}>
                {sword.name}
              </option>
            )
        )}
      </select>

      <button
        className="enchantButtons"
        type="button"
        onClick={() => handleBuyEnchant(swordId, swordDamage, swordEnchant)}
      >
        Enchant sword {Math.round(enchantsPrice)}
      </button>
    </div>
  );
}
