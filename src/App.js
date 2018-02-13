import React, { Component } from 'react';
import './App.css';

import DrinkMain from './DrinkMain.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Cocktail App (TBD)</h1>
        </header>
        <DrinkMain />
      </div>
    );
  }
}

export default App;
