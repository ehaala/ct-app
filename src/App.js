import React, { Component } from 'react';
import './App.css';

import Api from './Api.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Cocktail App (TBD)</h1>
        </header>
        <Api />
      </div>
    );
  }
}

export default App;
