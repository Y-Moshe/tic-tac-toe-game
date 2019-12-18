import React from 'react';

import Game from './containers/Game';
import logo from './logo.svg';
import './index.css';

export default class App extends React.Component {
  render() {
    return (
    <div>
        <header>
        <img src={logo} alt="logo" className="react-logo" />
        </header>
        <Game />
    </div>
    );
  }
}
