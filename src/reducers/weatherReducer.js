import {
  RECEIVE_WEATHER,
  FETCH_WEATHER,
} from '../actions';

export const INITIAL_STATE = {
  data: {},
  isLoading: false,
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_WEATHER:
      return { ...state, isLoading: true };
    case RECEIVE_WEATHER:
      return { isLoading: false, data: payload };
    default:
      return state;
  }
}