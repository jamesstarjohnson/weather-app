import { combineReducers } from "redux";

import weather from './weatherReducer';
import dayInfo from './dayInfoReducer';
import city from './cityReducer';

export default combineReducers({
  weather,
  dayInfo,
  city,
});