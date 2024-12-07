import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function App() {
  const [active,setActive] = useState("X");
  const [gameTurn,setGameTurn] = useState([]);
  const handleSelectSquare = (rowIdx, colIdx) => {
    setActive((currActive) => (currActive === "X" ? "O" : "X"));
    setGameTurn((prevTurns) => {
      let currPlayer = 'X';
      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
        currPlayer = 'O';
      }
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
