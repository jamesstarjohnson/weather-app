import React, { Component } from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import './Spinner.css';

class Spinner extends Component {
  static propType = {
    render: PropTypes.element,
    isLoading: PropTypes.bool.isRequired,
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    containerStyle: PropTypes.object,
    size: PropTypes.string,
  }

  render() {
    const { 
      isLoading, 
      render, 
      containerClassName, 
      className, 
      containerStyle,
      ...other,
    } = this.props;
    return (
      isLoading 
      ? <div style={containerStyle} className={cn('weather-spinner', containerClassName)}>
          <FontAwesomeIcon 
            icon={faSpinner} 
            className={cn('weather-spinner__speed', className)} 
            spin
            {...other}
          />
        </div>
      : (!!render ? <div>{render}</div> : null)
    );
  }
}

export default Spinner;
