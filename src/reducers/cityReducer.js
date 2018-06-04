import {
  TOGGLE_CITY,
  SAVE_CITY,
} from '../actions';
import { loadPersistedWeather } from '../localStorage';
import { UKRAINE_CITY, GREENLAND_CITY } from '../constants';

const loadedData = loadPersistedWeather() || {};
export const INITIAL_STATE = loadedData.city || UKRAINE_CITY;

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SAVE_CITY:
      return payload
    case TOGGLE_CITY:
      return state === UKRAINE_CITY ? GREENLAND_CITY : UKRAINE_CITY;
    default:
      return state;
  }
}