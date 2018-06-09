import React, { Component } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import { debounce } from 'lodash'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import './WeatherSearch.css';

class WeatherSearch extends Component {
  static propType = {
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
  }, 200);

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
    return (
        <div className={cn('weather-search', {'weather-search--focused': this.state.focused})}>
          <input 
            className="weather-search__input"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={this.state.value} 
            onChange={this.handleChange}
            placeholder="Search City" 
          />
          {this.props.isLoading && <div className="weather-search__spinner">
            <FontAwesomeIcon icon={faSpinner} className="weather-search__spinner-speed" spin />
          </div>}
        </div>
    );
  }
}

export default WeatherSearch;
