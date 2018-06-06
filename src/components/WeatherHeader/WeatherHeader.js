import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CityButton from '../CityButton';
import CurrentWeatherDisplay from '../CurrentWeatherDisplay';
import './WeatherHeader.css';

class WeatherHeader extends Component {

  static propType = {
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    wind: PropTypes.number.isRequired,
    currentCity: PropTypes.object.isRequired,
    onToggleCity: PropTypes.func.isRequired,
  }

  render() {
    const { icon, temp, currentCity, onToggleCity } = this.props;
    return (
      <div className="weather-header">
        <div className="weather-header__city">
          <CityButton
            onToggleCity={onToggleCity}
            currentCity={currentCity}
            cityName="Kiev"
            countryName="Ukraine"
          />
          <CityButton
            onToggleCity={onToggleCity}
            currentCity={currentCity}
            cityName="Qaanaaq"
            countryName="Greenland"
          />
        </div>
        <CurrentWeatherDisplay temp={temp} icon={icon}  />
      </div>
    );
  }
}

export default WeatherHeader;
