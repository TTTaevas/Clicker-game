import "./App.css";
import Game from "./components/Game";
import Toolbar from "./components/Toolbar";

export default function App() {
  return (
    <div className="App">
      <Toolbar />
      <Game />
    </div>
  );
}
