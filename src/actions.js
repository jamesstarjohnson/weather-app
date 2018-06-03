import fetchData from './api';
import { loadPersistedWeather, savePersistedWeather } from './localStorage';
import { shouldRequestWeather, convertToState } from './helpers';
import { INTERVAL_BETWEEN_REQUESTS } from './constants';

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_ORDER = 'CHANGE_ORDER';
export const FETCH_WEATHER = 'FETCH_WEATHER';

export const receiveWeather = weather => {
  return {
    type: RECEIVE_WEATHER,
    payload: weather,
  }
}

export const sortData = order => (dispatch, getState) => {
  if(getState().employees.isLoading) {
    return;
  }
  dispatch({
    type: CHANGE_ORDER,
    payload: order,
  });
}

export const changePage = page => (dispatch, getState) => {
  if(getState().employees.isLoading) {
    return;
  }
  dispatch({
    type: CHANGE_PAGE,
    payload: page,
  });
}

export const backgroundWeatherUpdate = () => (dispatch) => {
  setInterval(()=>{
    dispatch(fetchWeather());
  }, INTERVAL_BETWEEN_REQUESTS);
}

export const fetchWeather = () => dispatch => {
  const weatherData = loadPersistedWeather();
  console.log(weatherData);
  if(shouldRequestWeather(weatherData)) {
    dispatch({ type: FETCH_WEATHER });
    fetchData().then(data => {
      console.log(data);
      const weather = convertToState(data);
      savePersistedWeather(weather);
      dispatch(receiveWeather(weather));
    });
  } else {
    dispatch(receiveWeather(weatherData.data));
  }
}
