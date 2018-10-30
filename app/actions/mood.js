import API from '../utils/api';
import { db, auth } from '../../firebase/core';

export const ADD_MOOD = 'ADD_MOOD';
export const REMOVE_MOOD = 'REMOVE_MOOD';
export const SYNC_MOOD = 'SYNC_MOOD';

function addMood(mood) {
  return {
    type: ADD_MOOD,
    mood,
  };
}

function removeMood(id) {
  return {
    type: REMOVE_MOOD,
    id,
  };
}

export function handleAddMood(catID, optionID) {
  return function(dispatch) {
    return API.saveMood(catID, optionID)
      .then(mood => {
        dispatch(addMood(mood));
      })
      .catch(() => alert('There was an error. Try again.'));
  };
}

export function handleDeleteMood(mood) {
  return function(dispatch) {
    dispatch(removeMood(mood.id));

    return API.deleteMood(mood.id).catch(() => {
      dispatch(removeMood(mood));
      alert('An error occurred. Try again.');
    });
  };
}

export function handleSyncMood() {
  return function(dispatch) {
    if (!auth.currentUser) return;
    db.collection('mood')
      .where('owner_uid', '==', auth.currentUser.uid)
      .onSnapshot(snapshot => {
        const items = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          const currentItem = {
            id: doc.id,
            timestamp: data.timestamp.seconds,
            catID: data.catID,
            optionID: data.optionID,
          };
          items.push(currentItem);
        });

        dispatch({ type: SYNC_MOOD, mood: items });
      });
  };
}
