import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameturns) => {
  let currPlayer = "X";
  if (gameturns.length > 0 && gameturns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
};

const deriveWinner = (gameBoard, player) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
};

const deriveGameBoard = (gameTurn) => {
  let gameBoard = [...initialGameBoard.map((innerArr) => [...innerArr])];
  for (let turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

function App() {
  const [player, setPlayer] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  const active = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);

  const winner = deriveWinner(gameBoard, player);

  const hasDraw = gameTurn.length === 9 && !winner;

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

  const handleRestart = () => {
    setGameTurn([]);
  };
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={active === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={active === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
