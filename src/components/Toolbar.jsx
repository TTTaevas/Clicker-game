import "../style/toolbar.css";
import hurtBlob from "../../assets/test.gif";
import settings from "../../assets/settings.png";

export default function Toolbar() {
  return (
    <div className="toolbar">
      <img className="toolbarImage" src={hurtBlob} alt="logo" />
      <h1 className="title">Clicker-game</h1>
      <img className="toolbarImage settingsButton" src={settings} />
    </div>
  );
}
