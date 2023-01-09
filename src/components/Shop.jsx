import Sword from "./Sword";
import Potion from "./Potion";
export default function Shop({ score, setLife, setScore, potion, setPotion }) {
  return (
    <div className="shopContainer">
      <Sword score={score} setLife={setLife} setScore={setScore} />
      <Potion potion={potion} setPotion={setPotion} />
    </div>
  );
}
