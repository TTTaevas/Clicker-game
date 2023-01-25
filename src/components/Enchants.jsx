import "../style/shop.css";

export default function Enchants({
  enchantsPrice,
  handleBuyEnchant,
  swords
}) {
  return (
    <div className="enchantsTab">
      <select className="selectSword">
        {swords.map(
          (sword) =>
            (sword.bought === true && sword.enchant < 1) && (
              <option key={sword.id} value={sword.id}>
                {sword.name}
              </option>
            )
        )}
      </select>
      
      <button
        className="enchantButtons"
        type="button"
        onClick={() => {
          handleBuyEnchant(document.getElementsByClassName("selectSword")[0].value)
        }}
      >
        Enchant sword {Math.round(enchantsPrice)}
      </button>
    </div>
  );
}
