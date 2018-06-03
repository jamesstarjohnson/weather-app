import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './WeatherList.css';

class WeatherList extends Component {

  static propType = {
    data: PropTypes.array,
    onDayChange: PropTypes.func,
  }

  static defaultProps = {
    onDayChange: () => {}
  }

  renderTemp = temp => {
    return temp > 0 ? `+${temp}` : `-${temp}`;
  }

  renderList = () => {
    return this.props.data.map((item, index) => {
      return (
        <li className="weather-list__item" key={index} onClick={() => this.props.onDayChange(item)}>
          {item.weekDay}
          <img src={item.iconUrl} />
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
