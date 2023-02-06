import "../style/shop.css";

export default function Popup({
  damage,
  price,
  level,
  bought,
  equipped,
  desc,
}) {
  return (
    <div className="popup">
      <p className="popup">{damage}</p>
      <p className="popup">{level}</p>
      {bought === true && <p className="popup">Owned</p>}
      {equipped === true && <p className="popup">Currently Equipped</p>}
      <p className="popup">{desc}</p>
      <p className="popup">{price}</p>
    </div>
  );
}
