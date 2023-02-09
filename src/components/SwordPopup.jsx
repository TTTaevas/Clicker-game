import "../style/shop.css";
import coinIcon from "../../assets/coin.png";
import swordIcon from "../../assets/sword.png";

export default function SwordPopup({
  damage,
  price,
  level,
  bought,
  equipped,
  desc,
}) {
  return (
    <div className="popup">
      <div className="swordStatus">
        {bought === true && equipped === false && <p>Owned</p>}
        {equipped === true && <p>Currently Equipped</p>}
      </div>
      <p>{desc}</p>
      <div className="bottomPopup">
        <p>
          {" "}
          Next level cost: {Math.ceil(price * 1.07)}{" "}
          <img className="coinIcon" src={coinIcon} />
        </p>
        {level === 0 ? (
          <p>
            DPS: {Math.round(damage * 5)}{" "}
            <img className="coinIcon" src={swordIcon} />
          </p>
        ) : (
          <p>
            DPS: {Math.round(damage * 5 * (level + 1))}{" "}
            <img className="coinIcon" src={swordIcon} />
          </p>
        )}
      </div>
    </div>
  );
}
