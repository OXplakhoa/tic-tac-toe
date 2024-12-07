import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";

function App() {
  const [active,setActive] = useState("X");
  const handleSelectSquare = () => {
    setActive(currActive => currActive === 'X' ? 'O' : 'X');
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={active === 'X'}/>
          <Player name="Player 2" symbol="O" isActive={active === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activeSymbol={active}/>
      </div>
    </main>
  );
}

export default App;
