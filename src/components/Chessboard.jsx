import React, { useState } from 'react';
import './Chessboard.css';

const ChessGame = () => {
  const [board, setBoard] = useState([
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎'],
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ]);

  const handleMove = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = [...board];
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = '';
    setBoard(newBoard);
  };

  const renderSquare = (row, col) => {
    const piece = board[row][col];
    return (
      <Square
        key={`${row}-${col}`}
        row={row}
        col={col}
        piece={piece}
        onMove={handleMove}
      />
    );
  };

  const renderRow = (row) => {
    return (
      <div className="board-row" key={`row-${row}`}>
        {Array(8)
          .fill(null)
          .map((_, col) => renderSquare(row, col))}
      </div>
    );
  };

  return (
    <div className="chess-game">
      <div className="board">
        {Array(8)
          .fill(null)
          .map((_, row) => renderRow(row))}
      </div>
    </div>
  );
};

const getPossibleMoves = (row, col, piece) => {
    const possibleMoves = [];
    switch (piece) {
        case '♙':
            possibleMoves.push([row + 1, col]);
            if (row === 1) {
                possibleMoves.push([row + 2, col]);
            }
            break;
        case '♟︎':
            possibleMoves.push([row - 1, col]);
            if (row === 6) {
                possibleMoves.push([row - 2, col]);
            }
            break;
        case '♖':
        case '♜':
            for (let i = 0; i < 8; i++) {
                possibleMoves.push([row, i]);
                possibleMoves.push([i, col]);
            }
            break;
        case '♘':
        case '♞':
            possibleMoves.push([row + 2, col + 1]);
            possibleMoves.push([row + 2, col - 1]);
            possibleMoves.push([row - 2, col + 1]);
            possibleMoves.push([row - 2, col - 1]);
            possibleMoves.push([row + 1, col + 2]);
            possibleMoves.push([row + 1, col - 2]);
            possibleMoves.push([row - 1, col + 2]);
            possibleMoves.push([row - 1, col - 2]);
            break;
        case '♗':
        case '♝':
            for (let i = 0; i < 8; i++) {
                possibleMoves.push([row + i, col + i]);
                possibleMoves.push([row + i, col - i]);
                possibleMoves.push([row - i, col + i]);
                possibleMoves.push([row - i, col - i]);
            }
            break;
        case '♕':
        case '♛':
            for (let i = 0; i < 8; i++) {
                possibleMoves.push([row, i]);
                possibleMoves.push([i, col]);
                possibleMoves.push([row + i, col + i]);
                possibleMoves.push([row + i, col - i]);
                possibleMoves.push([row - i, col + i]);
                possibleMoves.push([row - i, col - i]);
            }
            break;
        case '♔':
        case '♚':
            possibleMoves.push([row + 1, col]);
            possibleMoves.push([row - 1, col]);
            possibleMoves.push([row, col + 1]);
            possibleMoves.push([row, col - 1]);
            possibleMoves.push([row + 1, col + 1]);
            possibleMoves.push([row + 1, col - 1]);
            possibleMoves.push([row - 1, col + 1]);
            possibleMoves.push([row - 1, col - 1]);
            break;
        default:
            break;
    }
    return possibleMoves.filter((move) => {
        const [moveRow, moveCol] = move;
        return moveRow >= 0 && moveRow < 8 && moveCol >= 0 && moveCol < 8;
    });
};


const Square = ({ row, col, piece, onMove }) => {
  const handleClick = () => {
    // show possible moves for the piece
    // if the user clicks on a possible move, move the piece
    // if the user clicks on a square with a piece, show possible moves for that piece
    if (piece) {
      const possibleMoves = getPossibleMoves(row, col, piece);
    //   for each possilble move change the color of the square to orange
    //   console.log(possibleMoves);
    possibleMoves.forEach(possibleMoves => {
      console.log(possibleMoves);
        // convert the possbile moves to the rows and columns
        var row = possibleMoves[0];
        var col = possibleMoves[1];
        console.log(document.getElementsByClassName("board-row")[row].children[col]);
        document.getElementsByClassName("board-row")[row].children[col].style.backgroundColor = "orange";
        // reset the color of the squares after 2 seconds

    });
    }

  };

  return (
    <div className="square" onClick={handleClick}>
      {piece}
    </div>
  );
};

export default ChessGame;
