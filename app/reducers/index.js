import { combineReducers } from 'redux';
import { weight, eating, habits } from './diet';
import medicaments from './medicaments';
import moods from './mood';
import selfCare from './self-care';
import { sleep, sleepTime } from './sleep';
import dataLoading from './data-loading';
import session from './session';

export default combineReducers({
  weight,
  eating,
  habits,
  medicaments,
  moods,
  selfCare,
  sleep,
  sleepTime,
  dataLoading,
  sessionState: session,
});
