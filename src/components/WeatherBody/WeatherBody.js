import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWeather, backgroundWeatherUpdate, changeDay } from '../../actions';
import { getWeatherList, getCurrentDayWeatherList } from '../../selectors';
import WeahterList from '../WeatherList';
import WeatherDetail from '../WeatherDetail';
import Spinner from '../Spinner';
import './WeatherBody.css';

class WeatherBody extends Component {
  static propType = {
    fetchWeather: PropTypes.func.isRequired,
    backgroundWeatherUpdate: PropTypes.func.isRequired,
    cityName: PropTypes.string.isRequired,    
    currentDayWeather: PropTypes.array.isRequired,
    currentDay: PropTypes.object.isRequired,
    weather: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.fetchWeather();
    this.props.backgroundWeatherUpdate();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.cityName !== this.props.cityName) {
      this.props.fetchWeather(true); 
    }
  }

  renderComponent = () => {
    const { 
      weather, 
      changeDay,
      currentDay, 
      currentDayWeather,
    } = this.props;
    return (
      <Fragment>
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
      </Fragment>
    )
  }

  render() {
    return (
      <Spinner
        containerClassName="weather-body__spinner"
        render={this.renderComponent()}
        isLoading={this.props.isLoading}
        size="4x"
        color="#bfbfbf"
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentDayWeather: getCurrentDayWeatherList(state),
    weather: getWeatherList(state),
    currentDay: state.dayInfo,
    cityName: state.city.city,    
    isLoading: state.weather.isLoading,
  }
}

export default connect(mapStateToProps, {
  fetchWeather, 
  backgroundWeatherUpdate,
  changeDay, 
})(WeatherBody);