import API from '../utils/api';
import { db, auth } from '../../firebase/core';

export const ADD_SLEEP = 'ADD_SLEEP';
export const REMOVE_SLEEP = 'REMOVE_SLEEP';
export const SYNC_SLEEP = 'SYNC_SLEEP';

export const ADD_SLEEP_TIME = 'ADD_SLEEP_TIME';
export const REMOVE_SLEEP_TIME = 'REMOVE_SLEEP_TIME';
export const SYNC_SLEEP_TIME = 'SYNC_SLEEP_TIME';

function addSleep(sleep) {
  return {
    type: ADD_SLEEP,
    sleep,
  };
}

function removeSleep(id) {
  return {
    type: REMOVE_SLEEP,
    id,
  };
}

function addSleepTime(sleepTime) {
  return {
    type: ADD_SLEEP_TIME,
    sleepTime,
  };
}

function removeSleepTime(id) {
  return {
    type: REMOVE_SLEEP_TIME,
    id,
  };
}

export function handleAddSleep(optionID) {
  return function(dispatch) {
    return API.saveSleep(optionID)
      .then(sleep => {
        dispatch(addSleep(sleep));
      })
      .catch(() => alert('There was an error. Try again.'));
  };
}

export function handleDeleteSleep(sleep) {
  return function(dispatch) {
    dispatch(removeSleep(sleep.id));

    return API.deleteSleep(sleep.id).catch(() => {
      dispatch(removeSleep(sleep));
      alert('An error occurred. Try again.');
    });
  };
}

export function handleAddSleepTime(bedtime, wakeup, callback) {
  return function(dispatch) {
    return API.saveSleepTime(bedtime, wakeup)
      .then(sleep => {
        dispatch(addSleepTime(sleep));
        callback();
      })
      .catch(() => alert('There was an error. Try again.'));
  };
}

export function handleDeleteSleepTime(sleep) {
  return function(dispatch) {
    dispatch(removeSleepTime(sleep.id));

    return API.deleteSleepTime(sleep.id).catch(() => {
      dispatch(removeSleepTime(sleep));
      alert('An error occurred. Try again.');
    });
  };
}

export function handleSyncSleep() {
  return function(dispatch) {
    if (!auth.currentUser) return;
    db.collection('sleep')
      .where('owner_uid', '==', auth.currentUser.uid)
      .onSnapshot(snapshot => {
        const items = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          const currentItem = {
            id: doc.id,
            timestamp: data.timestamp.seconds,
            optionID: data.optionID,
          };
          items.push(currentItem);
        });

        dispatch({ type: SYNC_SLEEP, sleep: items });
      });
  };
}

export function handleSyncSleepTime() {
  return function(dispatch) {
    if (!auth.currentUser) return;
    db.collection('sleeptime')
      .where('owner_uid', '==', auth.currentUser.uid)
      .onSnapshot(snapshot => {
        const items = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          const currentItem = {
            id: doc.id,
            timestamp: data.timestamp.seconds,
            bedtime: data.bedtime,
            wakeup: data.wakeup,
          };
          items.push(currentItem);
        });

        dispatch({ type: SYNC_SLEEP_TIME, sleepTime: items });
      });
  };
}
