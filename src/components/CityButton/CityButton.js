import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './CityButton.css';

class CityButton extends Component {
  static propType = {
    cityName: PropTypes.string.isRequired,
    countryName: PropTypes.string.isRequired,
    currentCity: PropTypes.object.isRequired,
    onToggleCity: PropTypes.func.isRequired,
  }

  handletoggleCity = () => {
    const { cityName, currentCity } = this.props;
    if(cityName !== currentCity.city) {
      this.props.onToggleCity();
    }
  }

  render() {
    const { currentCity, cityName, countryName } = this.props;
    return (
      <button
        className={`city-btn ${currentCity.city === cityName ? 'city-btn--active': ''}`}
        onClick={this.handletoggleCity}
      >
        <div className="city-btn__city-name">{cityName}</div>
        <div className="city-btn__country-name">{countryName}</div>
      </button>
    );
  }
}

export default CityButton;
