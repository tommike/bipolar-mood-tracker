import {
  EXTERNAL_DATA_REQUEST,
  EXTERNAL_DATA_REQUEST_RECEIVED,
  RECEIVE_DATA,
} from '../actions/shared';

export default function dataLoading(state = true, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return false;

    case EXTERNAL_DATA_REQUEST:
      return true;

    case EXTERNAL_DATA_REQUEST_RECEIVED:
      return false;

    default:
      return state;
  }
}
