import React, { Component } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import './CitiesDropdown.css';

class CitiesDropdown extends Component {
  static propType = {
    cities: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    getCountry: PropTypes.func.isRequired,
    onDropdownClose: PropTypes.func.isRequired,
  }

  state = {
    position: 0,
  }

  handleClickOutside() {
    this.props.onDropdownClose();
  }

  handleKeyDown = event => {
    if(['Enter', 'ArrowUp', 'ArrowDown', 'Escape'].includes(event.code)) {
      event.preventDefault();
      event.stopPropagation();
    }
    if(event.code === 'Enter') {
      this.props.onItemSelect(this.props.cities[this.state.position]);
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
      });
    } else if (event.code === 'Escape') {
      this.props.onDropdownClose();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { cities, onItemSelect, getCountry } = this.props;
    return (
      <div className="cities-dropdown">
        <ul className="cities-dropdown__list">
          {cities.map((item, index) => {
            return (
              <li 
                key={item.id} 
                onClick={() => onItemSelect(item)} 
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

export default enhanceWithClickOutside(CitiesDropdown);
