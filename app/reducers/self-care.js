import { ADD_SELF_CARE, REMOVE_SELF_CARE, SYNC_SELF_CARE } from '../actions/self-care';
import { RECEIVE_DATA } from '../actions/shared';

export default function selfCare(state = [], action) {
  switch (action.type) {
    case ADD_SELF_CARE:
      return state.concat([action.selfCare]);

    case REMOVE_SELF_CARE:
      return state.filter(selfCareItem => selfCareItem.id !== action.id);

    case RECEIVE_DATA:
      return action.selfCare;

    case SYNC_SELF_CARE:
      return action.selfCare;

    default:
      return state;
  }
}
