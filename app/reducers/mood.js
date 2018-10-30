import { ADD_MOOD, REMOVE_MOOD, SYNC_MOOD } from '../actions/mood';
import { RECEIVE_DATA } from '../actions/shared';

export default function mood(state = [], action) {
  switch (action.type) {
    case ADD_MOOD:
      return state.concat([action.mood]);

    case REMOVE_MOOD:
      return state.filter(moodItem => moodItem.id !== action.id);

    case RECEIVE_DATA:
      return action.mood;

    case SYNC_MOOD:
      return action.mood;

    default:
      return state;
  }
}
