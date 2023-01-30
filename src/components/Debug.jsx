import { useEffect } from "react";
import "../style/debug.css";

// useEffect is triggered 3 times + 1 additional time for each button click on debug menu
let preventUseEffectShenanigans = 0;

export default function Debug({
  setPower,
  setScore,
  setExperience,
  setMonsterZone,
}) {
  useEffect(() => {
    if (preventUseEffectShenanigans > 0) return;
    preventUseEffectShenanigans++;

    let keyPressed = {};
    let debugMenu = document.getElementsByClassName("debugMenu")[0];

    const keydown = function (e) {
      keyPressed[e.key + e.location] = true;
      if (keyPressed.Control1 == true && keyPressed.Control2 == true) {
        debugMenu.style.display =
          debugMenu.style.display === "none" ? "block" : "none";
        keyPressed = {};
      }
    };
    const keyup = function (e) {
      keyPressed[e.key + e.location] = false;
      keyPressed = {};
    };

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
  });
  return (
    <div className="debugMenu" style={{ display: "none" }}>
      <div className="debugOption">
        Power:
        <input className="debugPower"></input>
        <button
          onClick={() =>
            setPower(
              Number(document.getElementsByClassName("debugPower")[0].value)
            )
          }
        >
          Set
        </button>
        <button className="debugDefault" onClick={() =>setPower(195)}>Set to 195</button>
      </div>
      <div className="debugOption">
        Score:
        <input className="debugScore"></input>
        <button
          onClick={() =>
            setScore(
              Number(document.getElementsByClassName("debugScore")[0].value)
            )
          }
        >
          Set
        </button>
        <button className="debugDefault" onClick={() =>setScore(99999999999)}>Set to a lot</button>
      </div>
      <div className="debugOption">
        Experience:
        <input className="debugExp"></input>
        <button
          onClick={() =>
            setExperience(
              Number(document.getElementsByClassName("debugExp")[0].value)
            )
          }
        >
          Set
        </button>
        <button className="debugDefault" onClick={() =>setExperience(99999999999)}>Set to a lot</button>
      </div>
      <div className="debugOption">
        Zone:
        <input className="debugZone"></input>
        <button
          onClick={() =>
            setMonsterZone(
              Number(document.getElementsByClassName("debugZone")[0].value)
            )
          }
        >
          Set
        </button>
        <button className="debugDefault" onClick={() =>setMonsterZone(195)}>Set to 195</button>
      </div>
    </div>
  );
}
