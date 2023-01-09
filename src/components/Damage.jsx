import { useEffect, useState } from "react";
//import "../style/experience.css";
export default function Experiencebar({
  power,
  sword
}) {
  return (
    <div className="damage">
      <p>{power}HP per click | Swords inflict {sword}HP per second</p>
    </div>
  );
}
