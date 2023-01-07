import Sword from "./Sword";
import Potion from "./Potion";
export default function Shop({
  score,
  setLife,
  setScore,
  experience,
  setExperience,
}) {
  return (
    <>
      <Sword dégats="x" score={score} setLife={setLife} setScore={setScore} />
      <Potion experience={experience} setExperience={setExperience} />
    </>
  );
}
