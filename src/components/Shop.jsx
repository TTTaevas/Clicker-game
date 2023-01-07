import Sword from "./Sword";
import Potion from "./Potion";
export default function Shop({
  score,
  setLife,
  setScore,
  experience,
  setExperience,
  potion,
  setPotion,
}) {
  return (
    <>
      <Sword score={score} setLife={setLife} setScore={setScore} />
      <Potion
        potion={potion}
        setPotion={setPotion}
        experience={experience}
        setExperience={setExperience}
      />
    </>
  );
}
