import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './WeatherCard.css';

class WeatherCard extends Component {

  static propType = {
    currentDayWeather: PropTypes.array.isRequired,
    renderTemp: PropTypes.func.isRequired,   
  }

  renderTemp = temp => {
    return temp >= 0 ? temp : (-1 * temp);
  }

  render() {
    const { currentDayWeather } = this.props;
    let coldestTemp = Math.min(...currentDayWeather.map(item => item.temp));
    coldestTemp = coldestTemp < 0 ? (-1 * coldestTemp) : 0;
    return (
      <ul className="weather-card">
        {currentDayWeather.map(item => {
          return (
            <li className="weather-card__item" key={item.time}>
              <div className="weather-card__temp">{this.renderTemp(item.temp)}</div>
              <div className="weather-card__overzero-cell" style={{ height: item.temp > 0 ? `${2 * item.temp}px` : 0 }}></div>
              <div className="weather-card__subzero-cell" style={{ height: `${2 * coldestTemp}px`  }}>
                <div className="weather-card__subzero-temp" style={{ height: item.temp < 0 ? `${-2 * item.temp}px` : 0 }}></div>
              </div>
              <div className="weather-card__time">{`${item.time}:00`}</div>
            </li>
          )
        })}
      </ul>
    );
  }
}

export default WeatherCard;
