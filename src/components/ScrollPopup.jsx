import "../style/shop.css";
export default function ScrollPopup({
  used,
  using,
  bought,
  equipped,
  desc,
  condensedDesc,
}) {
  return (
    <div className="popup">
      <div className="swordStatus">
        {bought === true && equipped === false && <p>Owned</p>}
        {equipped === true && <p>Currently Equipped</p>}
      </div>
      <div className="description">
        <p>{desc}</p>
      </div>

      <div className="bottomPopup">
        <p>{condensedDesc}</p>
        {used && <p>Currently In Use</p>}
        {using === 0 && <p>On cooldown</p>}
      </div>
    </div>
  );
}
