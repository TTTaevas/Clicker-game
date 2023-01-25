import "../style/shop.css";

export default function Enchants({
  enchantsPrice,
  handleBuyEnchant,
  swords
}) {
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
        Enchant sword {Math.round(enchantsPrice)}
        </button>
      )}

    </div>
  );
}
