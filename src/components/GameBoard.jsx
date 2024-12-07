import { useState } from "react";

const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
];
export default function GameBoard({ onSelectSquare, activeSymbol }) {
    const [gameBoard,setGameBoard]= useState(initialGameBoard);
    const handleClickSquare = (rowIdx,colIdx) => {
        setGameBoard((prevGameBoard) => {
            const updateGameBoard = [...prevGameBoard.map(innerArr => [...innerArr])];
            updateGameBoard[rowIdx][colIdx]= activeSymbol;
            return updateGameBoard;
        })
        onSelectSquare();
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row,rowIdx) => (
                <li key={rowIdx}>
                    <ol>
                        {row.map((playerSymbol,colIdx) => (
                            <li key={colIdx}>
                                <button onClick={() => handleClickSquare(rowIdx,colIdx)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}