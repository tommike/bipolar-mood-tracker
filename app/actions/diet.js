import API from '../utils/api';
import { db, auth } from '../../firebase/core';

export const ADD_EATING = 'ADD_EATING';
export const REMOVE_EATING = 'REMOVE_EATING';
export const SYNC_EATING = 'SYNC_EATING';

export const ADD_HABIT = 'ADD_HABIT';
export const REMOVE_HABIT = 'ADD_HABIT';
export const SYNC_HABITS = 'SYNC_HABITS';

export const ADD_WEIGHT = 'ADD_WEIGHT';
export const REMOVE_WEIGHT = 'ADD_WEIGHT';
export const SYNC_WEIGHT = 'SYNC_WEIGHT';

function addEating(eating) {
  return {
    type: ADD_EATING,
    eating,
  };
}

function removeEating(id) {
  return {
    type: REMOVE_EATING,
    id,
  };
}

function addHabit(habit) {
  return {
    type: ADD_HABIT,
    habit,
  };
}

function removeHabit(id) {
  return {
    type: REMOVE_HABIT,
    id,
  };
}

export function addWeight(weight) {
  return {
    type: ADD_WEIGHT,
    weight,
  };
}

function removeWeight(id) {
  return {
    type: REMOVE_WEIGHT,
    id,
  };
}

export function handleAddEating(optionID) {
  return function(dispatch) {
    return API.saveEating(optionID)
      .then(eating => {
        dispatch(addEating(eating));
      })
      .catch(message => alert(message));
  };
}

export function handleDeleteEating(eating) {
  return function(dispatch) {
    dispatch(removeEating(eating.id));

    return API.deleteEating(eating.id).catch(() => {
      dispatch(removeEating(eating));
      alert('An error occurred. Try again.');
    });
  };
}

export function handleAddHabit(optionID) {
  return function(dispatch) {
    return API.saveHabit(optionID)
      .then(habit => {
        dispatch(addHabit(habit));
      })
      .catch(message => alert(message));
  };
}

export function handleDeleteHabit(habit) {
  return function(dispatch) {
    dispatch(removeHabit(habit.id));

    return API.deleteHabit(habit.id).catch(() => {
      dispatch(removeHabit(habit));
      alert('An error occurred. Try again.');
    });
  };
}

export function handleAddWeight(weightValue, callback) {
  return function(dispatch) {
    return API.saveWeight(weightValue)
      .then(weight => {
        dispatch(addWeight(weight));
        callback();
      })
      .catch(message => alert(message));
  };
}

export function handleDeleteWeight(weight) {
  return function(dispatch) {
    dispatch(removeWeight(weight.id));

    return API.deleteWeight(weight.id).catch(() => {
      dispatch(removeWeight(weight));
      alert('An error occurred. Try again.');
    });
  };
}

export function handleSyncHabit() {
  return function(dispatch) {
    if (!auth.currentUser) return;
    db.collection('habits')
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

        dispatch({ type: SYNC_HABITS, habits: items });
      });
  };
}

export function handleSyncWeight() {
  return function(dispatch) {
    if (!auth.currentUser) return;
    db.collection('weight')
      .where('owner_uid', '==', auth.currentUser.uid)
      .onSnapshot(snapshot => {
        const items = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          const currentItem = {
            id: doc.id,
            timestamp: data.timestamp.seconds,
            value: data.value,
          };
          items.push(currentItem);
        });

        dispatch({ type: SYNC_WEIGHT, weight: items });
      });
  };
}

export function handleSyncEating() {
  return function(dispatch) {
    if (!auth.currentUser) return;
    db.collection('eating')
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

        dispatch({ type: SYNC_EATING, eating: items });
      });
  };
}
