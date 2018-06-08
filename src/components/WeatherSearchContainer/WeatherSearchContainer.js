import React, { Component } from 'react';
import PropTypes from 'prop-types'
import WeatherSearch from './WeatherSearch';
import './WeatherSearchContainer.css';

class WeatherSearchContainer extends Component {
  static propType = {
  }

  state = {
    cities: [],
    isLoading: false,
  }

  handleSelect = item => {
    console.log(item);
    this.setState({cities: []});
  }

  handleSearch = value => {
    if(value.length < 3) {
      if(!!this.state.cities.length) {
        this.setState({cities: []});
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
      this.setState({ cities, isLoading: false });
    });
  }

  render() {
    return (
      <div className="weather-container">
        <WeatherSearch
          isDropdownOpen={!!this.state.cities.length}
          isLoading={this.state.isLoading} 
          cities={this.state.cities} 
          onSearch={this.handleSearch}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}

export default WeatherSearchContainer;
