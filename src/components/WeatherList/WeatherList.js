import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './WeatherList.css';

class WeatherList extends Component {
  static propType = {
    data: PropTypes.array.isRequired,
    onDayChange: PropTypes.func.isRequired,
    currentDay: PropTypes.object.isRequired,
  }

  static defaultProps = {
    onDayChange: () => {}
  }

  renderTemp = temp => {
    return temp > 0 ? `+${temp}` : temp;
  }

  renderList = () => {
    const { onDayChange, currentDay, data } = this.props;
    return data.map((item, index) => {
      return (
        <li 
          className={`weather-list__item ${currentDay.weekDayTextId === item.weekDayTextId ? 'weather-list__item--active' : ''}`}
          key={index} 
          onClick={() => onDayChange({
            weekDayTextId: item.weekDayTextId,
            index
          })}
        >
          <div className="weather-list__item-day">{item.weekDay}</div>
          <div><img src={item.iconUrl} alt="weather" /></div>
          <div className="weather-list__item-temp">
            <div>{this.renderTemp(item.maxTemp)}</div>
            <div>{this.renderTemp(item.minTemp)}</div>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="weather-list">
        {this.renderList()}
      </ul>
    );
  }
}

export default WeatherList;
