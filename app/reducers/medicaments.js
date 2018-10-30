import { ADD_MEDICAMENT, REMOVE_MEDICAMENT, SYNC_MEDICAMENTS } from '../actions/medicaments';
import { RECEIVE_DATA } from '../actions/shared';

export default function medicaments(state = [], action) {
  switch (action.type) {
    case ADD_MEDICAMENT:
      return state.concat([action.medicament]);

    case REMOVE_MEDICAMENT:
      return state.filter(medicament => medicament.id !== action.id);

    case RECEIVE_DATA:
      return action.medicaments;

    case SYNC_MEDICAMENTS:
      return action.medicaments;

    default:
      return state;
  }
}
