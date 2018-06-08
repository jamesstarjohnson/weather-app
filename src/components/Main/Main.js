import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchWeather, backgroundWeatherUpdate, changeDay, toggleCity } from '../../actions';
import { getWeatherList, getCurrentWeather, getCurrentDayWeatherList } from '../../selectors';
import WeahterList from '../WeatherList';
import WeatherHeader from '../WeatherHeader';
import WeatherDetail from '../WeatherDetail';
import WeatherSearchContainer from '../WeatherSearchContainer';
import './Main.css';

class Main extends Component {
  static propType = {
    fetchWeather: PropTypes.func.isRequired,
    backgroundWeatherUpdate: PropTypes.func.isRequired,
    dayInfo: PropTypes.number.isRequired,
    currentDayWeather: PropTypes.array.isRequired,
    currentCity: PropTypes.object.isRequired,
    toggleCity: PropTypes.func.isRequired,
    currentWeather: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.fetchWeather();
    this.props.backgroundWeatherUpdate();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currentCity.city !== this.props.currentCity.city) {
      this.props.fetchWeather(true); 
    }
  }

  render() {
    const { 
      weather, 
      currentWeather, 
      changeDay,
      toggleCity,
      currentDay, 
      currentDayWeather, 
      currentCity,
      isLoading } = this.props;

    if(isLoading) {
      return (
        <div className="weather-app-container">
          <div className="weather-app-container__loading">Loading...</div>
        </div>
      )
    }
    return (
      <div className="weather-app-container">
        <WeatherSearchContainer />
        <WeatherHeader 
          temp={currentWeather.temp}
          icon={currentWeather.icon}
          description={currentWeather.description}
          currentCity={currentCity}
          onToggleCity={toggleCity}          
        />
        <WeatherDetail 
          data={weather}
          currentDay={currentDay}
          currentDayWeather={currentDayWeather}
        />
        <WeahterList
          data={weather}
          onDayChange={changeDay}
          currentDay={currentDay}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentDayWeather: getCurrentDayWeatherList(state),
    weather: getWeatherList(state),
    currentDay: state.dayInfo,
    currentWeather: getCurrentWeather(state),
    currentCity: state.city,
    isLoading: state.weather.isLoading,
  }
}

export default connect(mapStateToProps, { 
  fetchWeather, 
  backgroundWeatherUpdate, 
  changeDay, 
  toggleCity 
})(Main);
