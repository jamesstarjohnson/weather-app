import React, { Component } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import Spinner from '../Spinner';
import './WeatherSearch.css';

class WeatherSearch extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  }

  state = {
    focused: false,
  }

  handleChange = event => {
    this.props.onChange(event.target.value);
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
            value={this.props.value} 
            onChange={this.handleChange}
            placeholder="Search City" 
          />
          <Spinner
            isLoading={this.props.isLoading}
            containerClassName="weather-search__spinner"
          />
        </div>
    );
  }
}

export default WeatherSearch;
