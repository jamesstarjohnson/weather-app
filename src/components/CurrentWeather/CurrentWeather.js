import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './CurrentWeather.css';

class CurrentWeather extends Component {

  static propType = {
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    wind: PropTypes.number.isRequired,
    currentCity: PropTypes.object.isRequired,
    onToggleCity: PropTypes.func.isRequired,
  }

  renderTemp = temp => {
    return temp > 0 ? `+${temp}` : temp;
  }

  handletoggleCity = city => () => {
    if(city !== this.props.currentCity.city) {
      this.props.onToggleCity()
    }
  }

  render() {
    const { icon, currentCity } = this.props;
    return (
      <div className="weather-header">
        <div className="current-city">
          <div 
            className={`current-city__item ${currentCity.city === 'Kiev' ? 'current-city__item--active': ''}`}
            onClick={this.handletoggleCity('Kiev')}
          >
            <div>Kiev</div>
            <div>Ukraine</div>
          </div>
          <div 
            className={`current-city__item ${currentCity.city === 'Qaanaaq' ? 'current-city__item--active': ''}`}
            onClick={this.handletoggleCity('Qaanaaq')}
          >
            <div>Qaanaaq</div>
            <div>Greenland</div>
          </div>
        </div>
        <div className="current-weather">
          <div className="current-weather__icon"><img src={icon} alt="weather" /></div>
          <div className="current-weather__temp">{this.renderTemp(this.props.temp)}</div>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
