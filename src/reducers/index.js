import { combineReducers } from "redux";

import weather from './weatherReducer';
import pageInfo from './pageInfoReducer';

export default combineReducers({
  weather,
  pageInfo,
});