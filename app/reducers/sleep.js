import {
  ADD_SLEEP,
  REMOVE_SLEEP,
  SYNC_SLEEP,
  ADD_SLEEP_TIME,
  REMOVE_SLEEP_TIME,
  SYNC_SLEEP_TIME,
} from '../actions/sleep';

import { RECEIVE_DATA } from '../actions/shared';

export function sleep(state = [], action) {
  switch (action.type) {
    case ADD_SLEEP:
      return state.concat([action.sleep]);

    case REMOVE_SLEEP:
      return state.filter(sleepItem => sleepItem.id !== action.id);

    case RECEIVE_DATA:
      return action.sleep;

    case SYNC_SLEEP:
      return action.sleep;

    default:
      return state;
  }
}

export function sleepTime(state = [], action) {
  switch (action.type) {
    case ADD_SLEEP_TIME:
      return state.concat([action.sleepTime]);

    case REMOVE_SLEEP_TIME:
      return state.filter(sleeptime => sleeptime.id !== action.id);

    case RECEIVE_DATA:
      return action.sleepTime;

    case SYNC_SLEEP_TIME:
      return action.sleepTime;

    default:
      return state;
  }
}
