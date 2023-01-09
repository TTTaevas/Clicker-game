import Sword from "./Sword";
import Potion from "./Potion";
export default function Shop({
  score,
  setLife,
  setScore,
  potion,
  setPotion,
  sword,
  setSword
}) {
  return (
    <div className="shopContainer">
      <Sword sword={sword} setSword={setSword} score={score} setLife={setLife} setScore={setScore} />
      <Potion potion={potion} setPotion={setPotion} />
    </div>
  );
}
