import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

const deriveActivePlayer = (gameturns) => {
  let currPlayer = 'X';
  if (gameturns.length > 0 && gameturns[0].player === 'X'){
    currPlayer = 'O';
  }
  return currPlayer;
}

function App() {
  const [gameTurn,setGameTurn] = useState([]);
  const active = deriveActivePlayer(gameTurn);
  const handleSelectSquare = (rowIdx, colIdx) => {
    setGameTurn((prevTurns) => {
      const active = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIdx, col: colIdx }, player: active },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={active === 'X'}/>
          <Player name="Player 2" symbol="O" isActive={active === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurn}/>
      </div>
      <Log turns={gameTurn}/>
    </main>
  );
}

export default App;
