import React from 'react';

import Board from '../components/Board';
import { calculateWinner } from '../Shared/Functions';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      isAscending: true
    }
  }

  handleClick(i) {
    const history = this.state.history[this.state.history.length - 1];
    const squares = history.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: this.state.history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext
    });
  }

  travelTo(index) {
    let history;
    if (index === 0) {
      history = this.state.history.slice(0, 1);
    } else {
      history = this.state.history.slice(0, index);
    }

    this.setState({
      history: history,
      xIsNext: index === 0 || (index % 2) === 0 // discovering which turn it is, X or O
    })
  }

  render() {
    const squares = this.state.history[this.state.history.length - 1].squares;
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: '.concat(this.state.xIsNext ? 'O' : 'X');
    } else {
      status = 'Next player: '.concat(this.state.xIsNext ? 'X' : 'O');
    }

    if (squares.every(val => val !== null) && !winner) {
      status = 'Game Over: Draw';
    }

    const moves = this.state.history.map((move, i, arr) => (
      <li key={'swdf32' + i}>
        <button onClick={() => this.travelTo(i)} disabled={arr.length === 1}>
          {i === 0 ? 'Restart' : 'Travel to ' + i + ' Move.'}
        </button>
      </li>
    ));
    if (!this.state.isAscending) {
      moves.reverse();
    }

    return (
        <main className="game">
          <div className="game-board">
            <Board squares={squares} onClick={(i) => { this.handleClick(i) } } />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>
              <li>
                <button
                  onClick={() => this.setState({isAscending: !this.state.isAscending})}
                  disabled={moves.length === 1}>
                    Sort {this.state.isAscending ? 'Descending' : 'Ascending'}
                  </button>
              </li>
              {moves}
            </ol>
          </div>
        </main>
    );
  }
}
