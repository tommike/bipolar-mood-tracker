import {
  ADD_EATING,
  REMOVE_EATING,
  SYNC_EATING,
  ADD_HABIT,
  REMOVE_HABIT,
  SYNC_HABITS,
  ADD_WEIGHT,
  SYNC_WEIGHT,
  REMOVE_WEIGHT,
} from '../actions/diet';

import { RECEIVE_DATA } from '../actions/shared';

export function eating(state = [], action) {
  switch (action.type) {
    case ADD_EATING:
      return state.concat([action.eating]);

    case REMOVE_EATING:
      return state.filter(eatingItem => eatingItem.id !== action.id);

    case RECEIVE_DATA:
      return action.eating;

    case SYNC_EATING:
      return action.eating;

    default:
      return state;
  }
}

export function habits(state = [], action) {
  switch (action.type) {
    case ADD_HABIT:
      return state.concat([action.habit]);

    case REMOVE_HABIT:
      return state.filter(habit => habit.id !== action.id);

    case RECEIVE_DATA:
      return action.habits;

    case SYNC_HABITS:
      return action.habits;

    default:
      return state;
  }
}

export function weight(state = [], action) {
  switch (action.type) {
    case ADD_WEIGHT:
      return state.concat([action.weight]);

    case REMOVE_WEIGHT:
      return state.filter(weightItem => weightItem.id !== action.id);

    case RECEIVE_DATA:
      return action.weight;

    case SYNC_WEIGHT:
      return action.weight;

    default:
      return state;
  }
}
