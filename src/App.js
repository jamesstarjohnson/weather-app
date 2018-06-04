import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Main from './components/Main';
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    );
  }
}

export default App;
