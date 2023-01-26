import { useEffect, useState } from "react";
import "../style/experience.css";
export default function Experiencebar({
  experience,
  setExperience,
  power,
  setPower,
}) {
  let [maxExperience, setMaxExperience] = useState(100);
  let [level, setLevel] = useState(1);
  useEffect(() => {
    if (experience >= maxExperience) {
      setExperience(0);
      setPower(power + 1);
      setMaxExperience(maxExperience * 2);
      setLevel(level + 1);
    }
  });
  return (
    <div className="experience">
      <h2> Level {level}</h2>
      <progress max={maxExperience} value={experience} /> <br />
      {experience}/{maxExperience} XP
    </div>
  );
}
