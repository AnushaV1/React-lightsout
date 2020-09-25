import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows, ncols, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

function createBoard() {
  let initialBoard =[];
  for(let y = 0; y < nrows; y++){
    let row = [];
    for(let x = 0; x < ncols; x++){
        row.push(Math.random() < chanceLightStartsOn)
    }
    initialBoard.push(row);
}
return initialBoard;
}
function hasWon() {
  // check the board in state to determine whether the player has won.
  return board.every(row => row.every(cell => !cell));
}

function flipCellsAround(coord) {
  setBoard(oldBoard => {
    const [y, x] = coord.split("-").map(Number);
  
    const flipCell = (y, x, copyBoard) => {
    
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        copyBoard[y][x] = !copyBoard[y][x];
      }
    };
      //Make a (deep) copy of the oldBoard
      const copyBoard = oldBoard.map(row => [...row]);
  
    // in the copy, flip this cell and the cells around it
    flipCell(y, x, copyBoard);
    flipCell(y, x - 1, copyBoard);
    flipCell(y, x + 1, copyBoard);
    flipCell(y - 1, x, copyBoard);
    flipCell(y + 1, x, copyBoard);

    return copyBoard;

  });
}
  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div>You Won!</div>;
  }
return (
  <table className="Board">
    {board.map((row,y)=> (
  <tr key={y}>
    {row.map((cell, x)=> (
      <Cell coordinates={ `${y}-${x}`}  isLit={board[y][x]} flipCellsAroundMe = {flipCellsAround} />
    ) )}
  </tr>
  ))
  }
  </table>
)


}

export default Board;
