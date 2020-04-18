import React, { Component } from 'react';

import './App.css';
import { Header, Footer } from './components';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
