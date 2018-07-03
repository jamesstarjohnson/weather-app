import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CurrentWeatherDisplay.css';

class CurrentWeatherDisplay extends Component {
  static propTypes = {
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
  }

  renderTemp = temp => {
    return temp > 0 ? `+${temp}` : temp;
  }

  render() {
    const { icon, temp } = this.props;
    return (
      <div className="current-weather">
        <div className="current-weather__icon"><img src={icon} alt="weather" /></div>
        <div className="current-weather__temp">{this.renderTemp(temp)}</div>
      </div>
    );
  }
}

export default CurrentWeatherDisplay;
