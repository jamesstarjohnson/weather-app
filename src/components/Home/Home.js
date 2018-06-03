import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchWeather, backgroundWeatherUpdate, changePage, sortData } from '../../actions';
import { getWeatherList } from '../../selectors';
import WeahterList from '../WeatherList';

class Home extends Component {
  static propType = {
    fetchWeather: PropTypes.func.isRequired,
    backgroundWeatherUpdate: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchWeather();
    this.props.backgroundWeatherUpdate();
  }

  render() {
    const { weather } = this.props;
    return (
      <WeahterList
        data={weather}
        // onPageChange={changePage}
        // data={employees}
        // pageInfo={pageInfo}
        // renderItem={this.renderItem}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    weather: getWeatherList(state),
  }
}

export default connect(mapStateToProps, { fetchWeather, backgroundWeatherUpdate, changePage, sortData })(Home);
