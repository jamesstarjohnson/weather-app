import React, { Component } from 'react';
import PropTypes from 'prop-types'
import WeatherCard from './WeatherCard';
import './WeatherDetail.css';

class WeatherDetail extends Component {

  static propType = {
    data: PropTypes.array.isRequired,
    currentDay: PropTypes.object.isRequired,
    currentDayWeather: PropTypes.array.isRequired,
  }

  renderTemp = temp => {
    return temp > 0 ? `+${temp}` : temp;
  }

  getStyle = () => {
    const { data, currentDay } = this.props;
    return {
      width: `${(data.length * 600)}px`,
      transform: `translateX(${currentDay.index * (-600)}px)`
    }
  }

  renderList = () => {
    const { data, currentDayWeather } = this.props;
    return data.map((item, index) => {
      return (
        <li 
          className="weather-detail__card" key={index}
        >
          <WeatherCard 
            currentDayWeather={currentDayWeather}
          />
        </li>
      )
    })
  }

  render() {
    return (
      <div className="weather-container">
        <ul className="weather-detail" style={this.getStyle()}>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default WeatherDetail;
