import fetchData from './api';
import { loadPersistedWeather, savePersistedWeather } from './localStorage';
import { shouldRequestWeather, convertToState } from './helpers';
import { INTERVAL_BETWEEN_REQUESTS } from './constants';

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const CHANGE_DAY = 'CHANGE_DAY';
export const TOGGLE_CITY = 'TOGGLE_CITY';
export const SAVE_CITY = 'SAVE_CITY';
export const FETCH_WEATHER = 'FETCH_WEATHER';

export const receiveWeather = weather => {
  return {
    type: RECEIVE_WEATHER,
    payload: weather,
  }
}

export const changeDay = day => {
  return {
    type: CHANGE_DAY,
    payload: day,
  }
}

export const saveCity = city => {
  return {
    type: SAVE_CITY,
    payload: city,
  }
}

export const toggleCity = () => {
  return {
    type: TOGGLE_CITY,
  }
}

export const backgroundWeatherUpdate = () => (dispatch) => {
  setInterval(()=>{
    dispatch(fetchWeather());
  }, INTERVAL_BETWEEN_REQUESTS);
}

export const fetchWeather = isCityChanged => (dispatch, getState) => {
  const loadedData = loadPersistedWeather();
  const city = getState().city;
  if(shouldRequestWeather(loadedData, isCityChanged)) {
    dispatch({ type: FETCH_WEATHER });
    fetchData(city.id).then(data => {
      console.log(data);
      const weather = convertToState(data);
      savePersistedWeather(weather, city);
      dispatch(receiveWeather(weather));
    });
  } else {
    dispatch(receiveWeather(loadedData.data));
    dispatch(saveCity(loadedData.city))
  }
}
