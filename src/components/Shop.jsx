import Sword from "./Sword";

export default function Shop({ score, setLife, setScore }) {
  return (
    <>
      <Sword score={score} setLife={setLife} setScore={setScore} />
    </>
  );
}
