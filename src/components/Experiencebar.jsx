import { useEffect, useState } from "react";
import "../style/experience.css";
export default function Experiencebar({
  experience,
  setExperience,
  power,
  setPower,
  level,
  setLevel,
}) {
  let [maxExperience, setMaxExperience] = useState(100);
  useEffect(() => {
    if (experience >= maxExperience) {
      setExperience(0);
      setPower(power + 1);
      setMaxExperience(Math.round(maxExperience * 1.4));
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
