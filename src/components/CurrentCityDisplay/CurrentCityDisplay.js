import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './CurrentCityDisplay.css';

class CurrentCityDisplay extends Component {
  static propTypes = {
    cityName: PropTypes.string.isRequired,
    countryName: PropTypes.string.isRequired,
  }

  render() {
    const { cityName, countryName } = this.props;
    return (
      <div
        className="current-city-display"
      >
        <div className="current-city-display__city-name">{cityName}</div>
        <div className="current-city-display__country-name">{countryName}</div>
      </div>
    );
  }
}

export default CurrentCityDisplay;
