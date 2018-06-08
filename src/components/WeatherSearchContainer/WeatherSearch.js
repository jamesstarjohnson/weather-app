import React, { Component } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import { debounce } from 'lodash'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import { getCountry } from '../../helpers';
import CitiesDropdown from './CitiesDropdown';
import './WeatherSearch.css';

class WeatherSearch extends Component {
  static propType = {
    isDropdownOpen: PropTypes.bool.isRequired,
    cities: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    value: '',
    focused: false,
  }

  requestData = debounce(() => {
    const value = this.state.value;
    this.props.onSearch(value);
  }, 1000);

  handleChange = event => {
    this.setState({value: event.target.value}, this.requestData);
  }

  handleFocus = () => {
    this.setState({ focused: true });
  }

  handleBlur = () => {
    this.setState({ focused: false })
  }

  render() {
    const { cities, isLoading, isDropdownOpen, onSelect } = this.props;
    return (
      <div className="weather-search">
        <div 
          className={cn(
          'weather-search__input-container', {
          'weather-search__input-container--focused': this.state.focused}
        )}
        >
          <input 
            className="weather-search__input"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={this.state.value} 
            onChange={this.handleChange}
            placeholder="Search City" 
          />
          {isLoading && <div className="weather-search__spinner">
            <FontAwesomeIcon icon={faSpinner} className="weather-search__spinner-speed" spin />
          </div>}
        </div>
        {isDropdownOpen && <CitiesDropdown
          isDropdownOpen={isDropdownOpen}
          onSelect={onSelect}
          cities={cities}
          getCountry={getCountry}
        />}
      </div>
    );
  }
}

export default WeatherSearch;
