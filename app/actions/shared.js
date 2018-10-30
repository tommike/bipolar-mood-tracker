import { getInitialData } from '../utils/api';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const EXTERNAL_DATA_REQUEST = 'EXTERNAL_DATA_REQUEST';
export const EXTERNAL_DATA_REQUEST_RECEIVED = 'EXTERNAL_DATA_REQUEST_RECEIVED';

function receiveData(medicaments, mood, selfCare, sleep, sleepTime, eating, habits, weight) {
  return {
    type: RECEIVE_DATA,
    medicaments,
    mood,
    selfCare,
    sleep,
    sleepTime,
    eating,
    habits,
    weight,
  };
}

export function externalDataRequest() {
  return {
    type: EXTERNAL_DATA_REQUEST,
  };
}

export function externalDataRequestReceived() {
  return {
    type: EXTERNAL_DATA_REQUEST_RECEIVED,
  };
}

export function handleInitialData() {
  return function(dispatch) {
    return getInitialData().then(
      ({ medicaments, mood, selfCare, sleep, sleepTime, eating, habits, weight }) => {
        dispatch(
          receiveData(medicaments, mood, selfCare, sleep, sleepTime, eating, habits, weight)
        );
      }
    );
  };
}
