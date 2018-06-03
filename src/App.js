import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Home from './components/Home';
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Home />
        </Provider>
      </div>
    );
  }
}

export default App;
