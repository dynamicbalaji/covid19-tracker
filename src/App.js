import React, { Component } from 'react';

import './App.css';
import { Header, Footer, SelectionTabs } from './components';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <SelectionTabs />
        <Footer />
      </div>
    );
  }
}

export default App;
