import {
  CHANGE_DAY,
} from '../actions';

import { getCurrentDay } from '../helpers';

export const INITIAL_STATE = {
  weekDayTextId: getCurrentDay(),
  index: 0,
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_DAY:
      return payload;
    default:
      return state;
  }
}