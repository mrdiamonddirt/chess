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

// handle the players turns
    const [player, setPlayer] = useState('white');
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [squareSelected, setSquareSelected] = useState(false);

//   handle move of a piece
  const handleMove = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = [...board];
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = '';
    setBoard(newBoard);
  };

//   render a square
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

//   render a row of squares
  const renderRow = (row) => {
    return (
      <div className="board-row" key={`row-${row}`}>
        {Array(8)
          .fill(null)
          .map((_, col) => renderSquare(row, col))}
      </div>
    );
  };

//   render the board
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

// function to get possible moves for a piece

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

// function to highlight the squares that are possible moves
const highlightSquares = (possibleMoves) => {
    for (let i = 0; i < possibleMoves.length; i++) {
        const [row, col] = possibleMoves[i];
        document.getElementsByClassName("board-row")[row].children[col].style.backgroundColor = "orange";
    }
}

// function to unhighlight the squares that are possible moves
const unhighlightSquares = (possibleMoves) => {
    for (let i = 0; i < possibleMoves.length; i++) {
        const [row, col] = possibleMoves[i];
        document.getElementsByClassName("board-row")[row].children[col].style.backgroundColor = "white";
    }
}

// function to get the row and column of the selected square
const getRowAndColumn = (row, col) => {
    console.log('row and column', row, col);
    document.getElementsByClassName("board-row")[row].children[col].style.border = "1px solid red";
}

// function to get the piece that is selected
const getPiece = (piece) => {
    console.log('piece selected', piece);
}

// function to get the possible moves for the selected piece
const getPossibleMovesForPiece = (row, col, piece) => {
    const possibleMoves = getPossibleMoves(row, col, piece);
    console.log('possible moves', possibleMoves);
    possibleMoves.forEach(possibleMoves => {
    //   console.log('moves', possibleMoves[0], possibleMoves[1]);
        // convert the possbile moves to the rows and columns
        var row = possibleMoves[0];
        var col = possibleMoves[1];
        // console.log(document.getElementsByClassName("board-row")[row].children[col]);
        document.getElementsByClassName("board-row")[row].children[col].style.border = "1px solid orange";
        // reset the color of the squares if selected a different piece
    });
    return possibleMoves;
}



const Square = ({ row, col, piece, onMove }) => {
  const handleClick = (event, selectedSquare) => {
    getRowAndColumn(row, col);
    getPiece(piece);
    selectedSquare = [row, col];
    console.log('selected square', selectedSquare);
    // console.log(event.target);
    if (piece) {
    console.log('piece selected', piece);
    //   get the selected square and add it to the moves component
    //   get the row and column of the selected square
    
    
    getPossibleMovesForPiece(row, col, piece);
    } else {
      console.log('empty');
    //   reset any highlighted squares
    document.getElementsByClassName("board-row")[row].children[col].style.border = "1px solid black";
    }
  };

  return (
    <div className="square" onClick={handleClick}>
      {piece}
    </div>
  );
};

export default ChessGame;
