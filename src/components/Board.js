import React from 'react';

import Square from './Square';
import { calculateWinner } from "../Shared/Functions";

export default function Board(props) {
  const renderSquare = (i, cName) => {
    return (
      <Square
        cName={cName}
        value={props.squares[i]}
        onClick={() => props.onClick(i)} />
    );
  }

  const winner = calculateWinner(props.squares);
  let rows = [];
  let count = 0;
  for (let i = 0; i < 3; i++) {
    let squares = [];
    for (let j = 0; j < 3; j++) {
      let squareWon;
      if (winner) {
        // eslint-disable-next-line no-loop-func
        squareWon = winner.find(sq => sq === count);
      }
      squares.push((
        <React.Fragment key={j}>
          {renderSquare(count, squareWon >= 0 ? 'square square-won' : 'square')}
        </React.Fragment>
      ));
      count++;
    }
    rows.push((
      <div className="board-row" key={i}>
        {squares}
      </div>
    ));
  }

  return (
    <div>
      {rows}
    </div>
  );
}
