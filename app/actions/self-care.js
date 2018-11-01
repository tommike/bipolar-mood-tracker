import API from '../utils/api';
import { db, auth } from '../../firebase/core';

export const ADD_SELF_CARE = 'ADD_SELF_CARE';
export const REMOVE_SELF_CARE = 'REMOVE_SELF_CARE';
export const SYNC_SELF_CARE = 'SYNC_SELF_CARE';

function addSelfCare(selfCare) {
  return {
    type: ADD_SELF_CARE,
    selfCare,
  };
}

function removeSelfCare(id) {
  return {
    type: REMOVE_SELF_CARE,
    id,
  };
}

export function handleAddSelfCare(optionID, notes, callback) {
  return function(dispatch) {
    return API.saveSelfCare(optionID, notes)
      .then(selfCare => {
        dispatch(addSelfCare(selfCare));
        callback();
      })
      .catch(message => alert(message));
  };
}

export function handleDeleteSelfCare(selfCare) {
  return function(dispatch) {
    dispatch(removeSelfCare(selfCare.id));

    return API.deleteSelfCare(selfCare.id).catch(() => {
      dispatch(removeSelfCare(selfCare));
      alert('An error occurred. Try again.');
    });
  };
}

export function handleSyncSelfCare() {
  return function(dispatch) {
    if (!auth.currentUser) return;
    db.collection('selfcare')
      .where('owner_uid', '==', auth.currentUser.uid)
      .onSnapshot(snapshot => {
        const items = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          const currentItem = {
            id: doc.id,
            timestamp: data.timestamp.seconds,
            optionID: data.optionID,
            notes: data.notes,
          };
          items.push(currentItem);
        });

        dispatch({ type: SYNC_SELF_CARE, selfCare: items });
      });
  };
}
