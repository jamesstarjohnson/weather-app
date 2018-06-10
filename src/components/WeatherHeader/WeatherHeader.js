import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentWeather } from '../../selectors';
import CurrentWeatherDisplay from '../CurrentWeatherDisplay';
import CurrentCityDisplay from '../CurrentCityDisplay';
import Spinner from '../Spinner';
import './WeatherHeader.css';

class WeatherHeader extends Component {

  static propType = {
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    countryName: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { icon, temp, cityName, countryName, isLoading } = this.props;
    return (
      <div className="weather-header">
        <CurrentCityDisplay cityName={cityName} countryName={countryName} />
        <Spinner
          className="weather-header__spinner"
          render={() => <CurrentWeatherDisplay temp={temp} icon={icon}  />}
          isLoading={isLoading}
          size="2x"
          color="#999999"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const currentWeather = getCurrentWeather(state);
  return {
    temp: currentWeather.temp,
    icon: currentWeather.icon,
    description: currentWeather.description,
    cityName: state.city.city,
    countryName: state.city.country,
    isLoading: state.weather.isLoading,
  }
}

export default connect(mapStateToProps)(WeatherHeader);
