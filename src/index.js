import React from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
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
      status = 'Winner: '.concat(winner);
    } else {
      status = 'Next player: '.concat(this.state.xIsNext ? 'X' : 'O');
    }

    const list = this.state.history.map((move, i, arr) => (
      <li key={i}>
        <button onClick={() => this.travelTo(i)} disabled={arr.length === 1}>
          {i === 0 ? 'Restart' : 'Travel to ' + i + ' Move.'}
        </button>
      </li>
    ))

    return (
      <div>
        <header>
          <img src={logo} alt="logo" className="react-logo" />
        </header>
        <main className="game">
          <div className="game-board">
            <Board squares={squares} onClick={(i) => { this.handleClick(i) } } />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>
              {list}
            </ol>
          </div>
        </main>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
