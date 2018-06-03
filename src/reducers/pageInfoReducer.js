import {
  CHANGE_PAGE,
  CHANGE_ORDER,
} from '../actions';

import { ASC } from '../constants';

export const INITIAL_STATE = {
  page: 1,
  order: ASC,
  pageCount: 10,
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PAGE:
      return payload < 1 || payload > state.pageCount  ? state : { ...state, page: payload };
    case CHANGE_ORDER:
      return { ...state, order: payload, page: 1 };
    default:
      return state;
  }
}