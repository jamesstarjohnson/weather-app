import React, { Component } from 'react';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { saveCity } from '../../actions';
import WeatherSearch from '../WeatherSearch';
import CitiesDropdown from '../CitiesDropdown';
import { getCountryName } from  '../../helpers';

class WeatherSearchContainer extends Component {
  static propTypes = {
    saveCity: PropTypes.func.isRequired,
  }

  state = {
    cityName: '',
    cities: [],
    isDropdownOpen: false,
    isLoading: false,
  }

  handleCityNameChange = value => {
    this.setState({ cityName: value }, this.handleSearch);
  }

  handleCitySelect = value => {
    this.setState({
      cities: [], 
      isDropdownOpen: false, 
      cityName: value.city
    }, () => this.props.saveCity(value));
  }

  handleDropdownClose = () => {
    this.setState({ isDropdownOpen: false });
  }

  handleSearch =  debounce(() => {
    const cityName = this.state.cityName;
    if(cityName.length < 3) {
      if(!!this.state.cities.length) {
        this.setState({cities: [], isDropdownOpen: false});
      }
      return;
    }
    this.setState({ isLoading: true });
    fetch(`http://localhost:3001/cities?name_like=${cityName}&_limit=5`)
    .then((resp) => resp.json())
    .then((resp) => {
      const cities = resp.map(item => {
        return {
          id: item.id,
          city: item.name,
          country: item.country,
        }
      });
      this.setState({ 
        cities, 
        isLoading: false, 
        isDropdownOpen: !!cities.length 
      });
    });
  }, 200);

  render() {
    return (
      <div className="weather-container">
        <WeatherSearch
          value={this.state.cityName}
          isLoading={this.state.isLoading} 
          onChange={this.handleCityNameChange}
        />
        {this.state.isDropdownOpen && <CitiesDropdown
          onItemSelect={this.handleCitySelect}        
          onDropdownClose={this.handleDropdownClose}
          cities={this.state.cities}
          getCountryName={getCountryName}
        />}
      </div>
    );
  }
}

export default connect(null, { saveCity })(WeatherSearchContainer);
