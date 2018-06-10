import React, { Component } from 'react';
import WeatherHeader from '../WeatherHeader';
import WeatherSearchContainer from '../WeatherSearchContainer';
import WeatherBody from '../WeatherBody';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="weather-app-container">
        <WeatherSearchContainer />
        <WeatherHeader />
        <WeatherBody />
      </div>
    );
  }
}

export default Main;
