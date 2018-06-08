import React, { Component } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import './CitiesDropdown.css';

class CitiesDropdown extends Component {
  static propType = {
    cities: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    getCountry: PropTypes.func.isRequired,
  }

  state = {
    position: 0,
  }

  handleKeyDown = event => {
    if(event.code === 'Backspace' || event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      return;
    }
    if(event.code === 'Enter') {
      this.props.onSelect(this.props.cities[this.state.position]);
    }
    if(event.code === 'ArrowUp') {
      this.setState(prev => {
        return {
          position: prev.position === 0 ? 4 : prev.position - 1,
        }
      });
    } else if (event.code === 'ArrowDown') {
      this.setState(prev => {
        return {
          position: prev.position === 4 ? 0 : prev.position + 1,
        }
      })
    }
    event.preventDefault()
    event.stopPropagation();
    console.log(event.code);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { cities, onSelect, getCountry } = this.props;
    return (
      <div className="cities-dropdown">
        <ul className="cities-dropdown__list">
          {cities.map((item, index) => {
            return (
              <li 
                key={item.id} 
                onClick={() => onSelect(item)} 
                className={cn('cities-dropdown__item', { 'cities-dropdown__item--active': this.state.position === index })}>
                <div className="cities-dropdown__city">{`${item.city},`}</div>
                <div className="cities-dropdown__country">{getCountry(item.country).name}</div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default CitiesDropdown;
