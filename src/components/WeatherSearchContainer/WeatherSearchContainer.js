import React, { Component } from 'react';
import WeatherSearch from './WeatherSearch';
import CitiesDropdown from './CitiesDropdown';
import { getCountry } from  '../../helpers';
import './WeatherSearchContainer.css';

class WeatherSearchContainer extends Component {
  state = {
    cities: [],
    isDropdownOpen: false,
    isLoading: false,
  }

  handleItemSelect = item => {
    console.log(item);
    this.setState({cities: [], isDropdownOpen: false});
  }

  handleDropdownClose = () => {
    this.setState({ isDropdownOpen: false });
  }

  handleSearch = value => {
    if(value.length < 3) {
      if(!!this.state.cities.length) {
        this.setState({cities: [], isDropdownOpen: false});
      }
      return;
    }
    this.setState({ isLoading: true });
    fetch(`http://localhost:3001/cities?name_like=${value}&_limit=5`)
    .then((resp) => resp.json())
    .then((resp) => {
      const cities = resp.map(item => {
        return {
          id: item.id,
          city: item.name,
          country: item.country,
        }
      });
      this.setState({ cities, isLoading: false, isDropdownOpen: !!cities.length });
    });
  }

  render() {
    return (
      <div className="weather-container">
        <WeatherSearch
          isLoading={this.state.isLoading} 
          onSearch={this.handleSearch}
        />
        {this.state.isDropdownOpen && <CitiesDropdown
          onItemSelect={this.handleItemSelect}        
          onDropdownClose={this.handleDropdownClose}
          cities={this.state.cities}
          getCountry={getCountry}
        />}
      </div>
    );
  }
}

export default WeatherSearchContainer;
